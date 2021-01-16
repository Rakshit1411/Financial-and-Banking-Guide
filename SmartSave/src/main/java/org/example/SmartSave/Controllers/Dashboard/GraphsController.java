package org.example.SmartSave.Controllers.Dashboard;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.apache.http.HttpHost;
import org.apache.http.util.EntityUtils;
import org.elasticsearch.client.Request;
import org.elasticsearch.client.Response;
import org.elasticsearch.client.RestClient;
import org.example.SmartSave.Model.Transaction;
import org.example.SmartSave.Services.Common.EsService;
import org.example.SmartSave.Services.Dashboard.GraphService;
import org.example.SmartSave.Services.MachineLearning.BusinessCategoryService;
import org.example.SmartSave.Services.Sms.SmsService;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.lang.reflect.Array;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import static org.openqa.selenium.By.id;
import static org.openqa.selenium.By.name;

@RestController
@RequestMapping("graph")
public class GraphsController {

    @Autowired
    SmsService smsService;

    @Autowired
    GraphService graphService;

    @Autowired
    BusinessCategoryService businessCategoryService;

    @PostMapping("/getAllGraphsData")
    public JSONObject getAllGraphsData(@RequestBody JSONObject params) {
        JSONObject obj = new JSONObject();
        JSONArray lineChartData = graphService.getLineChartData(params);
        JSONArray barGraphData = graphService.getBarGraphData(params);
        JSONArray pieChartData = graphService.getPieChartData(params);
        JSONObject highlights = graphService.getHighlights(params);
        obj.put("lineChartData",lineChartData);
        obj.put("barGraphData",barGraphData);
        obj.put("pieChartData",pieChartData);
        obj.putAll(highlights);
        return obj;
    }


    @PostMapping("/getAllTransactions")
    public JSONObject getAllTransactions(@RequestBody JSONObject params) {
            JSONObject obj = new JSONObject();
        JSONArray transactions = null;
        try {
            transactions = graphService.getAllTransactions(params);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        obj.put("transactionsList",transactions);
        return obj;
    }





    @PostMapping("/fetch")
    public String fetch(@RequestBody JSONObject params) {
        Iterable<Transaction> transactions = smsService.findAll();
        System.out.println(transactions.toString());
        return transactions.toString();
    }



}
