package org.example.SmartSave.Services.Common;

import com.alibaba.fastjson.JSONObject;
import org.apache.http.HttpHost;
import org.apache.http.util.EntityUtils;
import org.elasticsearch.client.Request;
import org.elasticsearch.client.Response;
import org.elasticsearch.client.RestClient;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.IOException;

@Service
public class EsService {

    public String getData(String query){
        RestClient restClient = RestClient.builder(
                new HttpHost("localhost", 9200, "http")).build();

        Request request = new Request("POST",  "/_sql");
        request.setJsonEntity("{\"query\":"+query+"}");
        Response response = null;
        try {
            response = restClient.performRequest(request);
            String responseBody = EntityUtils.toString(response.getEntity());
            System.out.println(responseBody);
            restClient.close();
            return responseBody;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "Failed";
    }
}
