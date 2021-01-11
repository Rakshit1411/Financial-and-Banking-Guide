package org.example.SmartSave.Services.UserProfile;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.google.common.primitives.Bytes;
import org.apache.commons.codec.DecoderException;
import org.apache.commons.codec.binary.Hex;
import org.example.SmartSave.Model.UserProfile;
import org.example.SmartSave.Repository.SmsRepository;
import org.example.SmartSave.Repository.UserProfileRepository;
import org.example.SmartSave.Services.Common.EsService;
import org.example.SmartSave.Services.Common.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.data.elasticsearch.core.query.Query;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.io.IOException;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Random;
import java.util.UUID;

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
        String result = esService.getData(query);
        JSONArray data = JSON.parseObject(result).getJSONArray("rows");
        if(data.size()>0){
            return "FAILED:USER_ALREADY_EXISTS";
        }
        UserProfile userProfile = new UserProfile();
        userProfile.setId(UUID.randomUUID().toString());
        userProfile.setFullName(params.getJSONObject("params").getString("fullName"));
        userProfile.setPhoneNumber(params.getJSONObject("params").getString("phoneNumber"));
        userProfile.setUsername(params.getJSONObject("params").getString("phoneNumber"));
        userProfile.setProfileImage(params.getJSONObject("params").getString("profileImage"));
        userProfile.setEmail(params.getJSONObject("params").getString("email"));
        userProfile.setDataSyncTime("");
        userProfile.setPassword(params.getJSONObject("params").getString("password"));
        userProfile.setPrimaryBank(params.getJSONObject("params").getString("primaryBank"));
        userProfile.setIsVerified(false);
        userProfileRepo.save(userProfile);
        return sentOtp(userProfile.getEmail(),userProfile.getPhoneNumber());
    }

    public String get(String phoneNumber){
        String query = String.format("\"SELECT * FROM userprofile where (phoneNumber = '%s')\"",phoneNumber);
        String result = esService.getData(query);
        JSONArray data = JSON.parseObject(result).getJSONArray("rows");
        return data.toString();
    }

    public String get(String phoneNumber,String password){
        String query = String.format("\"SELECT * FROM userprofile where (phoneNumber = '%s' and password = '%s')\"",phoneNumber,password);
        String result = esService.getData(query);
        JSONArray data = JSON.parseObject(result).getJSONArray("rows");
        return data.toString();
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
            mailService.sendMail("no-reply@smartsave.com",email,subject,body);
        } catch (MessagingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return hashedOtp;
    }
    private String generateOtp(int otp,String phoneNumber){
        String input = otp+phoneNumber;
        MessageDigest md = null;
        try {
            byte[] hash = input.getBytes("UTF-8");
            BigInteger number = new BigInteger(1, hash);
            StringBuilder hexString = new StringBuilder(number.toString(16));

            while (hexString.length() < 32) {
                hexString.insert(0, '0');
            }
            return hexString.toString();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return "";

    }
    public boolean verifyOtp(String phoneNumber,String number,String hex){
        String input = number+phoneNumber;
        byte[] bytes = new byte[0];
        try {
            bytes = Hex.decodeHex(hex.toCharArray());
            System.out.println(new String(bytes, "UTF-8"));
            if(input.equals(new String(bytes, "UTF-8"))) {
                return true;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
}
