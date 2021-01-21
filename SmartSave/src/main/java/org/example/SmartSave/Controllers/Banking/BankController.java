package org.example.SmartSave.Controllers.Banking;

import com.alibaba.fastjson.JSONObject;
import org.example.SmartSave.Services.Banking.BankService;
import org.example.SmartSave.Services.Banking.FixedDepositService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("bank")
public class BankController {

    @Autowired
    BankService bankService;

    @PostMapping("/add")
    public void addBank(@RequestBody JSONObject params){
        bankService.addBank(params);
    }
    @PostMapping("/remove")
    public String deleteById(@RequestBody JSONObject params){
        String output = bankService.deleteById(params.getString("id"));
        return output;
    }
    @GetMapping("/bulkAdd")
    public void bulkAddBank(@RequestParam String url,@RequestParam String query){
        bankService.bulkAddBank(url,query);
    }
}
