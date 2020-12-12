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
import org.example.SmartSave.Services.MachineLearning.BusinessCategoryService;
import org.example.SmartSave.Services.Sms.SmsService;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.UUID;

import static org.openqa.selenium.By.id;
import static org.openqa.selenium.By.name;

@RestController
@RequestMapping("sms")
public class SmsController {

    @Autowired
    SmsService smsService;

    @Autowired
    BusinessCategoryService businessCategoryService;

    //This function will be called once, when the user runs the app. It will check the latest sms's and update elastic search.
    @PostMapping("/analyse")
    public String analyse(@RequestBody JSONObject params) {


        String uselessPhrasesString  = "requested,will be,points,Points,recharging,Recharging,recharge,Recharge";
        String[] uselessPhrases = uselessPhrasesString.split(",");
        JSONArray rawTransactions = params.getJSONArray("data");
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
            if(flag==true){
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
            transaction.setAccountNumber(params.getString("phoneNo").toString()+"||"+transaction.getAccountNumber());
            transaction.setPaidToCategory(businessCategoryService.predictCategory(transaction.getPaidTo()));
            smsService.save(transaction);
        }

        System.out.println(params);
        return String.format("Hello1 %s!", params.toString());
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
    @PostMapping("/test")
    public void test(@RequestBody JSONObject oarams){
        RestClient restClient = RestClient.builder(
                new HttpHost("localhost", 9200, "http")).build();

        Request request = new Request("POST",  "/_sql");
        request.setJsonEntity("{\"query\":\"SELECT * FROM transactions where (accountNumber LIKE '9888138824||%') order by date limit 10\"}");
        Response response = null;
        try {
            response = restClient.performRequest(request);
            String responseBody = EntityUtils.toString(response.getEntity());
            System.out.println(responseBody);
            restClient.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
