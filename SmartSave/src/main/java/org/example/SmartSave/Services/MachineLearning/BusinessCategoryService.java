package org.example.SmartSave.Services.MachineLearning;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.example.SmartSave.Model.BusinessCategory;
import org.example.SmartSave.Repository.BusinessCategoryRepository;
import org.example.SmartSave.Services.Common.EsService;
import org.example.SmartSave.Services.Common.HttpService;
import org.example.SmartSave.Services.Sms.SmsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.client.RestTemplate;
import tech.tablesaw.api.DateColumn;
import tech.tablesaw.api.Table;
import tech.tablesaw.selection.Selection;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class BusinessCategoryService {

    @Autowired
    private BusinessCategoryRepository businessCategoryRepository;

    @Autowired
    HttpService httpService;

    @Autowired
    EsService esService;

    @Value("${model.url}")
    String modelUrl;

    @Autowired
    public void setBusinessCategoryRepository(BusinessCategoryRepository businessCategoryRepository) {
        this.businessCategoryRepository = businessCategoryRepository;
    }

    public String predictCategory(String paidTo){
        String output = "";
        JSONObject params = new JSONObject();
        params.put("paidTo",paidTo);
        output = httpService.postRequest("http://"+modelUrl+"/predict/svc",params).getJSONArray("category").get(0).toString();
        return output;
    }

    public String setCategory(JSONObject params){

        String output = "";
        output = httpService.postRequest("http://"+modelUrl+"/dataset/update",params).toString();
        return output;
    }

    public String addCategory(JSONObject params){
        BusinessCategory businessCategory = new BusinessCategory();
        businessCategory.setId(UUID.randomUUID().toString());
        businessCategory.setCategory(params.getString("category"));
        businessCategory.setCategoryImage(params.getString("categoryImage"));
        businessCategoryRepository.save(businessCategory);
        return "SUCCESS";
    }

    public JSONObject getAllCategories(JSONObject params) {
        String query = String.format("\"SELECT * FROM businesscategory\"");
        String result = esService.getData(query);
        JSONArray data = JSON.parseObject(result).getJSONArray("rows");
        JSONObject response = new JSONObject();
        for (Object item:data) {
            JSONArray itemArray = (JSONArray)item;
            response.put(itemArray.get(1).toString(),itemArray.get(2).toString());
        }
        return response;
    }
    public JSONObject getCategory(JSONObject params) {
        String query = String.format("\"SELECT * FROM businesscategory where category = '%s'\"",params.getString("category"));
        String result = esService.getData(query);
        JSONArray data = JSON.parseObject(result).getJSONArray("rows");
        JSONObject response = new JSONObject();
        for (Object item:data) {
            JSONArray itemArray = (JSONArray)item;
            response.put(itemArray.get(3).toString(),itemArray.get(1).toString());
        }
        return response;
    }
}
