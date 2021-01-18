package org.example.SmartSave.Controllers.Banking;

import com.alibaba.fastjson.JSONObject;
import org.example.SmartSave.Services.Banking.FixedDepositService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("fd")
public class FixedDepositController {

    @Autowired
    FixedDepositService fixedDepositService;

    @PostMapping("/add")
    public void addNewBankData(@RequestBody JSONObject params){
        String bank = params.getString("bank");
        String url = params.getString("url");
        String query = params.getString("query");
        fixedDepositService.addFd(bank,url,query);
    }
}
