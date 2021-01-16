package org.example.SmartSave.Controllers.UserProfile;

import com.alibaba.fastjson.JSONObject;
import org.example.SmartSave.Services.UserProfile.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("user")
public class UserProfileController {

    @Autowired
    UserProfileService userProfileService;

    @PostMapping("add")
    public String add(@RequestBody JSONObject params){
        return userProfileService.add(params);
    }

    @PostMapping("deleteAll")
    public String deleteAll(@RequestBody JSONObject params){
        return userProfileService.deleteAll();
    }

    @PostMapping("update")
    public String update(@RequestBody JSONObject params){
        return userProfileService.update(params.getString("phoneNo"),params.getString("lastDataSync"));
    }
    @PostMapping("verify")
    public Boolean verify(@RequestBody JSONObject params){
        return userProfileService.verifyOtp(params.getString("phoneNumber"),params.getString("number"),params.getString("hex"),params.getJSONObject("params"));
    }
    @PostMapping("create")
    public void create(@RequestBody JSONObject params){
        userProfileService.createUser(params);
    }
}
