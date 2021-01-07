package org.example.SmartSave.Services.Budget;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONAware;
import com.alibaba.fastjson.JSONObject;
import org.example.SmartSave.Model.Budget;
import org.example.SmartSave.Model.BusinessCategory;
import org.example.SmartSave.Model.UserProfile;
import org.example.SmartSave.Repository.BudgetRepository;
import org.example.SmartSave.Repository.BusinessCategoryRepository;
import org.example.SmartSave.Repository.SmsRepository;
import org.example.SmartSave.Repository.UserProfileRepository;
import org.example.SmartSave.Services.Common.EsService;
import org.example.SmartSave.Services.Dashboard.GraphService;
import org.example.SmartSave.Services.MachineLearning.BusinessCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.data.elasticsearch.core.query.Query;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

import static org.elasticsearch.index.query.QueryBuilders.regexpQuery;

@Service
public class BudgetService {

    private BudgetRepository budgetRepository;
    @Autowired
    EsService esService;
    @Autowired
    ElasticsearchOperations elasticsearchTemplate;
    @Autowired
    BusinessCategoryService businessCategoryService;

    @Autowired
    private BusinessCategoryRepository businessCategoryRepository;

    @Autowired
    GraphService graphService;

    @Autowired
    public void setBudgetRepository(BudgetRepository budgetRepository) {
        this.budgetRepository = budgetRepository;
    }

    public String add(JSONObject params){
        Budget budget = new Budget();
        budget.setAmountThreshold(params.getString("amountThreshold"));
        budget.setId(UUID.randomUUID().toString());
        JSONObject cjson = new JSONObject();
        cjson.put("category",params.getString("category"));
        JSONObject out = businessCategoryService.getCategory(cjson);
        String cat="";
        for (String s : out.keySet()) {
            cat = s;
        }
        budget.setAmountThreshold(params.getString("amount"));
        budget.setCategoryId(cat);
        budget.setUserId(params.getString("phoneNumber"));
        Date today = new Date();
        budget.setCalDate(""+today.toInstant().toEpochMilli());

        budgetRepository.save(budget);
        return "SUCCESS";
    }

    public JSONArray getRemainingBudget(JSONObject params){
        String phoneNumber = params.getString("phoneNumber");
        String query = String.format("\"SELECT * FROM budget where (userId = '%s') order by calDate desc\"",phoneNumber);
        String result = esService.getData(query);
        JSONArray data = JSON.parseObject(result).getJSONArray("rows");
        JSONArray response = new JSONArray();

        JSONObject parameter = new JSONObject();
        parameter.put("phoneNo",params.getString("phoneNumber"));
        JSONArray pieChartData = graphService.getPieChartData(parameter);
        for(Object x:data){
            JSONObject obj = new JSONObject();
            JSONArray xarr = (JSONArray) x;
            String dateString = xarr.get(2).toString();
            Calendar calendar = Calendar.getInstance();
            int currentMonth = calendar.get(Calendar.MONTH);
            calendar.setTimeInMillis(Long.parseLong(dateString));
            int month = calendar.get(Calendar.MONTH);

            if(month!=currentMonth){
                break;
            }

            Optional<BusinessCategory> category = businessCategoryRepository.findById(xarr.get(3).toString());
            obj.put("amountThreshold",xarr.get(1).toString());
            for (Iterator<BusinessCategory> it = category.stream().iterator(); it.hasNext(); ) {
                BusinessCategory y = it.next();
                obj.put("category",y.getCategory());

            }
            for(int i=0;i<pieChartData.size();i++) {
                if(((JSONObject)pieChartData.get(i)).getString("label").equals(obj.getString("category"))){
                    obj.put("amountSpent",((JSONObject)pieChartData.get(i)).getString("value"));
                }
            }
            response.add(obj);
        }
        return response;
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
