package org.example.SmartSave.Services.Common;

import com.alibaba.fastjson.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class HttpService {
    public JSONObject postRequest(String url, JSONObject params){
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<JSONObject> response
                = restTemplate.postForEntity(url ,params, JSONObject.class);
        System.out.println(response);
        return response.getBody();
    }

}
