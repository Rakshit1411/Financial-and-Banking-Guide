package org.example.SmartSave.Controllers.MachineLearning;

import com.alibaba.fastjson.JSONObject;
import org.example.SmartSave.Services.MachineLearning.BusinessCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("ml/model")
public class BusinessCategoryController {

    @Autowired
    private BusinessCategoryService businessCategoryService;

    @PostMapping("/predict")
    public void predictCategory(@RequestBody JSONObject params){
        businessCategoryService.predictCategory(params.getString("paidTo"));
    }
    @PostMapping("/update")
    public void updateCategory(@RequestBody JSONObject params){
        businessCategoryService.setCategory(params);
    }
}
