package org.example.SmartSave.Controllers.Auth;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.example.SmartSave.Services.UserProfile.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("login")
public class LoginController {

    @Autowired
    UserProfileService userProfileService;

    @PostMapping("check")
    public String check(@RequestBody JSONObject params){

        String user = userProfileService.get(params.getString("phoneNumber"),params.getString("password"));
        JSONArray data = JSON.parseArray(user);
        if(data.size() == 0){
            return data.toString();
        }
        JSONObject response = new JSONObject();
        response.put("username",((JSONArray)data.get(0)).get(7));
        response.put("fullname",((JSONArray)data.get(0)).get(2));
        response.put("phoneNumber",((JSONArray)data.get(0)).get(5));
        response.put("profileImage",((JSONArray)data.get(0)).get(6));
        response.put("dataSyncTime",((JSONArray)data.get(0)).get(1));
        return response.toString();
    }


}
