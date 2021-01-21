package org.example.SmartSave.Services.Banking;

import org.example.SmartSave.Model.Budget;
import org.example.SmartSave.Model.FixedDeposit;
import org.example.SmartSave.Repository.BudgetRepository;
import org.example.SmartSave.Repository.FixedDepositRepository;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.data.elasticsearch.core.query.Query;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

import static org.elasticsearch.index.query.QueryBuilders.regexpQuery;

@Service
public class FixedDepositService {
    private FixedDepositRepository fdRepository;
    @Autowired
    ElasticsearchOperations elasticsearchTemplate;
    @Autowired
    public void setFixedDepositRepository(FixedDepositRepository fdRepository) {
        this.fdRepository = fdRepository;
    }

    public String deleteById(String id) {
        fdRepository.deleteById(id);
        return "SUCCESS";
    }
    public FixedDeposit findByBank(String bank){
        Query searchQuery = new NativeSearchQueryBuilder()
                .withFilter(regexpQuery("bank", bank))
                .build();
        SearchHits<FixedDeposit> fds =
                elasticsearchTemplate.search(searchQuery, FixedDeposit.class);
        if(fds.getSearchHits().size() == 0) {
            return null;
        }
        FixedDeposit fd = fds.getSearchHit(0).getContent();
        return fd;
    }
    public void addFd(String bank, String url, String query){
        try {
            Document doc = Jsoup.connect(url).get();
            Element ele = doc.select(query).get(0);
            FixedDeposit fd = new FixedDeposit();
            fd.setId(UUID.randomUUID().toString());
            fd.setBank(bank);
            List<Map<String,String>> data = new ArrayList<>();
            Element table = ele.getElementsByTag("table").get(0);
            Elements rows = table.getElementsByTag("tr");
            for(int i=0;i<rows.size();i++){
                Elements cols = rows.get(i).getElementsByTag("td");
                Map<String,String> rowMap = new HashMap<String,String>();
                for(int j=0;j<cols.size();j++){
                    if(j==0){
                        String col = cols.get(j).text();
                        String unit = col.substring(col.lastIndexOf(" ")).trim();

                        col = col.replaceAll("[^\\d]", " ");
                        col = col.trim();
                        col = col.replaceAll(" +", " ");
                        rowMap.put("from",col.split(" ")[0]);
                        if(col.split(" ").length <2) {
                            continue;
                        }
                        rowMap.put("to",col.split(" ")[1]);
                        rowMap.put("unit",unit);

                    }
                    else if(j==1) {
                    rowMap.put("interestRate",cols.get(j).text());
                    }
                }
                data.add(rowMap);
                System.out.println(rows.get(i).text());
            }
            fd.setData(data);
            fdRepository.save(fd);
            System.out.println();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
