package org.example.SmartSave.Controllers.Sms;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.apache.http.HttpHost;
import org.apache.http.util.EntityUtils;
import org.elasticsearch.client.Request;
import org.elasticsearch.client.Response;
import org.elasticsearch.client.RestClient;
import org.example.SmartSave.Model.Transaction;
import org.example.SmartSave.Model.UserProfile;
import org.example.SmartSave.Services.Common.EsService;
import org.example.SmartSave.Services.MachineLearning.BusinessCategoryService;
import org.example.SmartSave.Services.Sms.SmsService;
import org.example.SmartSave.Services.UserProfile.UserProfileService;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.data.elasticsearch.core.query.Query;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.UUID;

import static org.elasticsearch.index.query.QueryBuilders.regexpQuery;
import static org.openqa.selenium.By.id;
import static org.openqa.selenium.By.name;

@RestController
@RequestMapping("sms")
public class SmsController {

    @Autowired
    SmsService smsService;

    @Autowired
    UserProfileService userProfileService;

    @Autowired
    BusinessCategoryService businessCategoryService;

    @Autowired
    EsService esService;

    //This function will be called once, when the user runs the app. It will check the latest sms's and update elastic search.
    @PostMapping("/analyse")
    public String analyse(@RequestBody JSONObject params) {
        String lastDateSync=null;
        JSONArray user = JSON.parseArray(userProfileService.get(params.getString("phoneNumber")));
        lastDateSync = ((JSONArray)user.get(0)).get(1).toString();
        String uselessPhrasesString  = "requested,will be,points,Points,recharging,Recharging,recharge,Recharge";
        String[] uselessPhrases = uselessPhrasesString.split(",");
        JSONArray rawTransactions = params.getJSONArray("data");
        String newLastDateSync = "";
        for(int i=0;i<rawTransactions.size();i++) {
            boolean flag=false;
            String body = ((JSONObject)rawTransactions.get(i)).getString("body").toString();
            for(String phrase:uselessPhrases) {
                if(body.contains(phrase)) {
                    System.out.println("Useless Phrase"+body);
                    flag=true;
                    break;
                }
            }
            if(flag==true || (!lastDateSync.isEmpty() && lastDateSync.compareTo(((JSONObject)rawTransactions.get(i)).getString("date_sent").toString())>=0)){
                continue;
            }

            Transaction transaction = new Transaction();
            transaction.setId(UUID.randomUUID().toString());

            transaction.setDate(((JSONObject)rawTransactions.get(i)).getString("date_sent").toString());
            transaction.setRawBody(body);
            transaction.setSender(((JSONObject)rawTransactions.get(i)).getString("address").toString());
            transaction.setAmount(smsService.parseAmount(body));
            if(transaction.getAmount().equals(-1)){
                continue;
            }
            transaction.setAccountNumber(smsService.parseAccountNumber(body));
            transaction.setPaidTo(smsService.parsePaidTo(body));
            if(transaction.getAccountNumber().isEmpty()){
                continue;
            }
            transaction.setType(transaction.getRawBody().contains("debited")?"0":"1");
            transaction.setAccountNumber(params.getString("phoneNumber").toString()+"||"+transaction.getAccountNumber());
            transaction.setPaidToCategory(businessCategoryService.predictCategory(transaction.getPaidTo()));
            if(newLastDateSync.compareTo(transaction.getDate())<0){
                newLastDateSync = transaction.getDate();
            }
            smsService.save(transaction);
        }
        userProfileService.update(params.getString("phoneNumber"),newLastDateSync);
        return lastDateSync;
    }

    @PostMapping("/fetch")
    public String fetch(@RequestBody JSONObject params) {
        Iterable<Transaction> transactions = smsService.findAll();
        System.out.println(transactions.toString());
        return transactions.toString();
    }

    @PostMapping("/deleteAll")
    public String delete(@RequestBody JSONObject params) {
        smsService.remove();

        return "SUCCESS";
    }

}
