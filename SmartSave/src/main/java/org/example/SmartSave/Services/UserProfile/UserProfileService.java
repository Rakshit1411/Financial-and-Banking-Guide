package org.example.SmartSave.Services.UserProfile;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.primitives.Bytes;
import org.apache.commons.codec.DecoderException;
import org.apache.commons.codec.Encoder;
import org.apache.commons.codec.binary.Hex;
import org.elasticsearch.index.Index;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.example.SmartSave.Model.UserProfile;
import org.example.SmartSave.Repository.SmsRepository;
import org.example.SmartSave.Repository.UserProfileRepository;
import org.example.SmartSave.Services.Common.EsService;
import org.example.SmartSave.Services.Common.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.IndexQuery;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.data.elasticsearch.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.mail.MessagingException;
import java.io.IOException;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.*;

import static org.elasticsearch.index.query.QueryBuilders.regexpQuery;

@Service
public class UserProfileService {

    private UserProfileRepository userProfileRepo;
    @Autowired
    EsService esService;
    @Autowired
    ElasticsearchOperations elasticsearchTemplate;
    @Autowired
    MailService mailService;

    @Autowired
    public void setUserProfileRepository(UserProfileRepository userProfileRepo) {
        this.userProfileRepo = userProfileRepo;
    }

    public String add(JSONObject params){
        String query = String.format("\"SELECT * FROM userprofile where (phoneNumber = '%s')\"",params.getJSONObject("params").getString("phoneNumber"));
//        String result = esService.getData(query);
//        JSONArray data = JSON.parseObject(result).getJSONArray("rows");
//        if(data.size()>0){
//            return "FAILED:USER ALREADY EXISTS";
//        }
        return sentOtp(params.getJSONObject("params").getString("email"),params.getJSONObject("params").getString("phoneNumber"));
    }
    public void createUser(JSONObject params){
        UserProfile userProfile = new UserProfile();
        userProfile.setId(UUID.randomUUID().toString());
        userProfile.setFullName(params.getString("fullName"));
        userProfile.setPhoneNumber(params.getString("phoneNumber"));
        userProfile.setUsername(params.getString("phoneNumber"));
        userProfile.setProfileImage(params.getString("profileImage"));
        userProfile.setEmail(params.getString("email"));
        userProfile.setDataSyncTime("");
        userProfile.setPassword(params.getString("password"));
        userProfile.setPrimaryBank(params.getString("primaryBank"));
        userProfile.setIsVerified(true);
        userProfileRepo.save(userProfile);
    }

    public String get(String phoneNumber){
        String query = String.format("\"SELECT * FROM userprofile where (phoneNumber = '%s')\"",phoneNumber);
        String result = esService.getData(query);
        JSONArray data = JSON.parseObject(result).getJSONArray("rows");
//        Query searchQuery = new NativeSearchQueryBuilder()
//                .withFilter(regexpQuery("phoneNumber", phoneNumber))
//                .build();
//        SearchHits<UserProfile> users =
//                elasticsearchTemplate.search(searchQuery, UserProfile.class);
//        UserProfile user = users.getSearchHit(0).getContent();
        return data.toString();
    }
    public UserProfile getUserProfile(String phoneNumber){
        Query searchQuery = new NativeSearchQueryBuilder()
                .withFilter(regexpQuery("phoneNumber", phoneNumber))
                .build();
        SearchHits<UserProfile> users =
                elasticsearchTemplate.search(searchQuery, UserProfile.class);
        UserProfile user = users.getSearchHit(0).getContent();
        return user;
    }

    public String get(String phoneNumber,String password){
        BoolQueryBuilder boolQueryBuilder = QueryBuilders.boolQuery();
        BoolQueryBuilder bq = QueryBuilders.boolQuery() ;
        bq.must(QueryBuilders.termQuery("phoneNumber", phoneNumber)) ;
        bq.must(QueryBuilders.termQuery("password", password)) ;
        boolQueryBuilder.must(bq);
        NativeSearchQueryBuilder searchQueryBuilder = new NativeSearchQueryBuilder().withQuery(boolQueryBuilder) ;
        Page<UserProfile> users = userProfileRepo.search(searchQueryBuilder.build());
        // 总条数
        for (UserProfile user : users) {
            System.out.println(user);
        }
        if(users.getContent()==null || users.getContent().size()==0){
            return "ERROR";
        }
        UserProfile user = users.getContent().get(0);

        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.writeValueAsString(user);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return "ERROR";
    }

    public String update(String phoneNumber,String lastDateSync){
        Query searchQuery = new NativeSearchQueryBuilder()
                .withFilter(regexpQuery("phoneNumber", phoneNumber))
                .build();
        SearchHits<UserProfile> users =
                elasticsearchTemplate.search(searchQuery, UserProfile.class);
        UserProfile user = users.getSearchHit(0).getContent();
        user.setDataSyncTime(lastDateSync);
        userProfileRepo.save(user);
        return "SUCCESS";
    }


    public String deleteAll(){
        userProfileRepo.deleteAll();
        return "SUCCESS";
    }
    private String sentOtp(String email,String phoneNumber){
        String subject = "Email verification to use SmartSave";
        Random rnd = new Random();
        int number = rnd.nextInt(999999);
        String hashedOtp = generateOtp(number,phoneNumber);
        String body = "Your OTP for email verification is : "+number;
        try {
            mailService.sendMail(email,subject,body);
        } catch (MessagingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return hashedOtp;
    }
    private String generateOtp(int otp,String phoneNumber){
        String input = otp+phoneNumber;
        try {
//            new String(Base64.decodeBase64(Base64.encodeBase64(hash)));
//            byte[] bytes = input.getBytes("UTF-8");
//            byte[] encoded = Base64.encodeBase64(bytes);
//            List<String> output = new ArrayList<String>();
//            for(byte b:encoded){
//                output.add(""+b);
//            }
            Base64.Encoder encoder = Base64.getEncoder();
            String originalString = input;
            String encodedString = encoder.encodeToString(originalString.getBytes());

            System.out.println(encodedString);
            return encodedString;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return "";

    }
    public boolean verifyOtp(String phoneNumber,String number,String hex,JSONObject params){
        String input = number+phoneNumber;
        try {
            Base64.Decoder decoder = Base64.getDecoder();
            byte[] bytes = decoder.decode(hex);

            System.out.println(new String(bytes));
            if(input.equals(new String(bytes))) {
                createUser(params);
                return true;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
}
