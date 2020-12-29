package org.example.SmartSave.Services.Budget;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.example.SmartSave.Model.Budget;
import org.example.SmartSave.Model.UserProfile;
import org.example.SmartSave.Repository.BudgetRepository;
import org.example.SmartSave.Repository.SmsRepository;
import org.example.SmartSave.Repository.UserProfileRepository;
import org.example.SmartSave.Services.Common.EsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.data.elasticsearch.core.query.Query;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

import static org.elasticsearch.index.query.QueryBuilders.regexpQuery;

@Service
public class BudgetService {

    private BudgetRepository budgetRepository;
    @Autowired
    EsService esService;
    @Autowired
    ElasticsearchOperations elasticsearchTemplate;

    @Autowired
    public void setBudgetRepository(BudgetRepository budgetRepository) {
        this.budgetRepository = budgetRepository;
    }

    public String add(JSONObject params){
        Budget budget = new Budget();
        budget.setAmountThreshold(params.getString("amountThreshold"));
        budget.setId(UUID.randomUUID().toString());
        budget.setCategoryId(params.getString("categoryId"));
        budget.setUserId(params.getString("phoneNumber"));
        Date today = new Date();
        budget.setCalDate(""+today.toInstant().toEpochMilli());

        budgetRepository.save(budget);
        return "SUCCESS";
    }

    public String get(String phoneNumber){
        String query = String.format("\"SELECT * FROM userprofile where (phoneNumber = '%s')\"",phoneNumber);
        String result = esService.getData(query);
        JSONArray data = JSON.parseObject(result).getJSONArray("rows");
        return data.toString();
    }

    public String get(String phoneNumber,String password){
        String query = String.format("\"SELECT * FROM userprofile where (phoneNumber = '%s' and password = '%s')\"",phoneNumber,password);
        String result = esService.getData(query);
        JSONArray data = JSON.parseObject(result).getJSONArray("rows");
        return data.toString();
    }

    public String update(String phoneNumber,String amountThreshold){
        Query searchQuery = new NativeSearchQueryBuilder()
                .withFilter(regexpQuery("userId", phoneNumber))
                .build();
        SearchHits<Budget> budgets =
                elasticsearchTemplate.search(searchQuery, Budget.class);
        Budget budget = budgets.getSearchHit(0).getContent();
        budget.setAmountThreshold(amountThreshold);
        budgetRepository.save(budget);
        return "SUCCESS";
    }
    public String deleteAll(){
        budgetRepository.deleteAll();
        return "SUCCESS";
    }
}
