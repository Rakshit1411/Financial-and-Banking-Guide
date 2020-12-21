package org.example.SmartSave.Services.Sms;

import com.alibaba.fastjson.JSONObject;
import org.example.SmartSave.Model.Transaction;
import org.example.SmartSave.Model.UserProfile;
import org.example.SmartSave.Repository.SmsRepository;
import org.example.SmartSave.Services.Common.HttpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class SmsService {

    private SmsRepository smsRepository;



    @Autowired
    HttpService httpService;
    @Autowired
    public void setSmsRepository(SmsRepository smsRepository) {
        this.smsRepository = smsRepository;
    }

    private final String MONEY_REGEX="[rR][sS]\\.?\\s?[,\\d]+\\.?\\d{0,2}|[iI][nN][rR]\\.?\\s*[,\\d]+\\.?\\d{0,2}";
    private final String ACCOUNT_REGEX="(?i)[a-zA-z0-9]*((a\\/c)|(account)|(acc))?\\s(no)?(\\.)?\\s?[0-9]*[x\\*.-]*[0-9]*[x\\*.-]+[0-9]{3,}";
    private final String PAIDTO_REGEX="(?i)(\\w*(towards )(UPI ID )?)";

    public void save(Transaction transaction) {
        smsRepository.save(transaction);
    }

    public Iterable<Transaction> findAll() {
        return smsRepository.findAll();
    }
    public void remove(){
        smsRepository.deleteAll();
    }

    public Double parseAmount(String body){
        String amount = parse(body,MONEY_REGEX);
        amount = removeChar(amount,',');
        for(int i=0;i<amount.length();i++) {
            if (amount.charAt(i) - '0' >= 0 && amount.charAt(i) - '0' <= 9) {
                amount = amount.substring(i);
                break;
            }
        }
        if(StringUtils.isEmpty(amount)) {
            return Double.parseDouble("-1");
        }
        return Double.parseDouble(amount);
    }

    public String parseAccountNumber(String body){
        String accountNumber = parse(body,ACCOUNT_REGEX);
        if(accountNumber.isEmpty())
            return accountNumber;
        accountNumber = accountNumber.substring(accountNumber.length()-3);
        return accountNumber;

    }

    public String parsePaidTo(String body){
        String parsedValue="";
        // Create a Pattern object
        Pattern r = Pattern.compile(PAIDTO_REGEX);

        // Now create matcher object.
        Matcher m = r.matcher(body);
        if (m.find( )) {
            parsedValue = m.group(0);
            try {
                parsedValue = body.substring(m.end(), m.end() + body.substring(m.end()).indexOf(". "));
            }
            catch(Exception e){
                System.out.println(e);
                parsedValue="Other";
            }
        }else {
            parsedValue="Other";
            System.out.println("NO MATCH");
        }
        return parsedValue;
    }

    private String parse(String body, String REGEX){
        String parsedValue="";
        // Create a Pattern object
        Pattern r = Pattern.compile(REGEX);

        // Now create matcher object.
        Matcher m = r.matcher(body);
        if (m.find( )) {
            parsedValue = m.group(0);
        }else {
            System.out.println("NO MATCH");
        }

        return parsedValue;
    }

    private String removeChar(String s, char c)
    {
        int j, count = 0, n = s.length();
        char []t = s.toCharArray();
        String output = "";
        for (int i = j = 0; i < n; i++)
        {
            if (t[i] != c)
                output += t[i];
            else
                count++;
        }

        while(count > 0)
        {
            t[j++] = '\0';
            count--;
        }

        return output;
    }





}
