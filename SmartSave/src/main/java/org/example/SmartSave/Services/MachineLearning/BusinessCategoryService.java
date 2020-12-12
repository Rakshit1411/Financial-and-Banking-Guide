package org.example.SmartSave.Services.MachineLearning;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.example.SmartSave.Model.BusinessCategory;
import org.example.SmartSave.Repository.BusinessCategoryRepository;
import org.example.SmartSave.Services.Common.HttpService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public void setBusinessCategoryRepository(BusinessCategoryRepository businessCategoryRepository) {
        this.businessCategoryRepository = businessCategoryRepository;
    }

    public String predictCategory(String paidTo){
        String output = "";
        JSONObject params = new JSONObject();
        params.put("paidTo",paidTo);
        output = httpService.postRequest("http://127.0.0.1:5000/predict/svc",params).getJSONArray("category").get(0).toString();
        return output;
    }

    public String setCategory(JSONObject params){
        String output = "";
        output = httpService.postRequest("http://127.0.0.1:5000/dataset/update",params).toString();
        return output;
    }

}
