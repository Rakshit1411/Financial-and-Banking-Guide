package org.example.SmartSave.Controllers.MachineLearning;

import com.alibaba.fastjson.JSONObject;
import org.example.SmartSave.Model.BusinessCategory;
import org.example.SmartSave.Services.MachineLearning.BusinessCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("category")
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

    @PostMapping("/add")
    public void addCategory(@RequestBody JSONObject params){
        businessCategoryService.addCategory(params);
    }

    @PostMapping("/getAllCategories")
    public JSONObject getAllCategories(@RequestBody JSONObject params){
        return businessCategoryService.getAllCategories(params);
    }
    @PostMapping("/getCategory")
    public JSONObject getCategory(@RequestBody JSONObject params){
        return businessCategoryService.getCategory(params);
    }
}
