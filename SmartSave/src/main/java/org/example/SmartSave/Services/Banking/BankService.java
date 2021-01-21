package org.example.SmartSave.Services.Banking;

import com.alibaba.fastjson.JSONObject;
import org.example.SmartSave.Model.Bank;
import org.example.SmartSave.Model.FixedDeposit;
import org.example.SmartSave.Repository.BankRepository;
import org.example.SmartSave.Repository.FixedDepositRepository;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.util.*;

@Service
public class BankService {
    private BankRepository bankRepository;
    @Autowired
    ElasticsearchOperations elasticsearchTemplate;
    @Autowired
    FixedDepositService fdService;
    @Autowired
    public void setBankRepository(BankRepository bankRepository) {
        this.bankRepository = bankRepository;
    }

    public void addBank(JSONObject params){
        String name = params.getString("name");
        String shortName = !StringUtils.isEmpty(params.getString("shortName"))?params.getString("shortName"):name;
        String interestRate = params.getString("interestRate");
        FixedDeposit fd = fdService.findByBank(name);
        Bank bank = new Bank();
        bank.setId(UUID.randomUUID().toString());
        bank.setName(name);
        bank.setShortName(shortName);
        bank.setInterestRate(interestRate);
        if(fd!=null)
            bank.setFdId(fd.getId());
        bankRepository.save(bank);
    }

    public String deleteById(String id) {
        bankRepository.deleteById(id);
        return "SUCCESS";
    }

    public void bulkAddBank(String url,String query){
        try {
            Document doc = Jsoup.connect(url).get();
            Element ele = doc.select(query).get(0);
            List<Map<String,String>> data = new ArrayList<>();
            Element table = ele.getElementsByTag("table").get(0);
            Elements rows = table.getElementsByTag("tr");
            List<Bank> banks = new ArrayList<Bank>();
            for(int i=0;i<rows.size();i++){
                Bank bank = new Bank();
                bank.setId(UUID.randomUUID().toString());
                Elements cols = rows.get(i).getElementsByTag("td");
                Map<String,String> rowMap = new HashMap<String,String>();
                for(int j=0;j<cols.size();j++){
                    if(j==2){
                        String col = cols.get(j).text();
                        String[] rates = col.split(" - ");
                        bank.setInterestRate(rates[0]);
                    }
                    else if(j==0) {
                        bank.setName(cols.get(j).text());
                        bank.setShortName(bank.getName());
                        FixedDeposit fd = fdService.findByBank(bank.getName());
                        if(fd!=null)
                            bank.setFdId(fd.getId());
                        
                    }
                }
                data.add(rowMap);
                System.out.println(rows.get(i).text());
                banks.add(bank);
            }
            bankRepository.saveAll(banks);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
