package org.example.SmartSave.Controllers.Banking;

import com.alibaba.fastjson.JSONObject;
import org.elasticsearch.monitor.fs.FsService;
import org.example.SmartSave.Model.Bank;
import org.example.SmartSave.Model.UserProfile;
import org.example.SmartSave.Services.Banking.BankService;
import org.example.SmartSave.Services.Banking.FixedDepositService;
import org.example.SmartSave.Services.UserProfile.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("insights")
public class InsightsController {

    @Autowired
    BankService bankService;
    @Autowired
    FixedDepositService fdService;
    @Autowired
    UserProfileService userProfileService;

    @PostMapping("/general")
    public JSONObject generalInsights(@RequestBody JSONObject params){
        String phoneNumber = params.getString("phoneNumber");
        UserProfile user = userProfileService.getUserProfile(phoneNumber);
        String primaryBank = user.getPrimaryBank();
        Bank bank = bankService.getBank(primaryBank);
        String interestRate = bank.getInterestRate().substring(0,bank.getInterestRate().length()-1);
        String savings = "10000";
        String duration = "2";//in months
        Double interestGained = Double.parseDouble(savings)*Double.parseDouble(interestRate);
        interestGained = interestGained/100;
        JSONObject result = new JSONObject();
        result.put("savings",savings);
        result.put("duration",duration);
        result.put("interestGained",interestGained);
        result.put("primaryBankInterestRate",interestRate);
        result.put("primaryBank",primaryBank);
        return result;
    }
    @PostMapping("/remove")
    public String deleteById(@RequestBody JSONObject params){
        String output = bankService.deleteById(params.getString("id"));
        return output;
    }
}
