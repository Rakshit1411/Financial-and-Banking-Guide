package org.example.SmartSave.Controllers.Budget;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.example.SmartSave.Services.Budget.BudgetService;
import org.example.SmartSave.Services.UserProfile.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("budget")
public class BudgetController {

    @Autowired
    BudgetService budgetService;

    @PostMapping("add")
    public String add(@RequestBody JSONObject params){
        return budgetService.add(params);
    }

    @PostMapping("deleteAll")
    public String deleteAll(@RequestBody JSONObject params){
        return budgetService.deleteAll();
    }

    @PostMapping("delete")
    public String delete(@RequestBody JSONObject params){
        return budgetService.delete(params);
    }

    @PostMapping("update")
    public String update(@RequestBody JSONObject params){
        return budgetService.update(params.getString("phoneNo"),params.getString("amountThreshold"));
    }
    @PostMapping("getRemainingBudget")
    public JSONArray getRemainingBudget(@RequestBody JSONObject params){
        return budgetService.getRemainingBudget(params);
    }
}
