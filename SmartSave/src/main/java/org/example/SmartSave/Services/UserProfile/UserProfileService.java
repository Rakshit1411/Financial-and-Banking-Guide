package org.example.SmartSave.Services.UserProfile;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.example.SmartSave.Model.UserProfile;
import org.example.SmartSave.Repository.SmsRepository;
import org.example.SmartSave.Repository.UserProfileRepository;
import org.example.SmartSave.Services.Common.EsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.data.elasticsearch.core.query.Query;
import org.springframework.stereotype.Service;

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
    public void setUserProfileRepository(UserProfileRepository userProfileRepo) {
        this.userProfileRepo = userProfileRepo;
    }

    public String add(JSONObject params){
        String query = String.format("\"SELECT * FROM userprofile where (phoneNumber = '%s')\"",params.getString("phoneNumber"));
        String result = esService.getData(query);
        JSONArray data = JSON.parseObject(result).getJSONArray("rows");
        if(data.size()>0){
            return "FAILED:USER_ALREADY_EXISTS";
        }
        UserProfile userProfile = new UserProfile();
        userProfile.setId(UUID.randomUUID().toString());
        userProfile.setFullName(params.getString("fullName"));
        userProfile.setPhoneNumber(params.getString("phoneNumber"));
        userProfile.setUsername(params.getString("username"));
        userProfile.setProfileImage(params.getString("profileImage"));
        userProfile.setDataSyncTime("");
        userProfile.setPassword(params.getString("password"));
        userProfileRepo.save(userProfile);
        return "SUCCESS";
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
}
