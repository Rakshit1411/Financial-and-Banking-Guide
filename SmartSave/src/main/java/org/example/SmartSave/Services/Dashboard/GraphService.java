package org.example.SmartSave.Services.Dashboard;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.example.SmartSave.Services.Common.EsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;

@Service
public class GraphService {

    @Autowired
    EsService esService;

    public JSONArray getBarGraphData(JSONObject params) {
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");

        JSONArray response = new JSONArray();
        Calendar date = Calendar.getInstance();
        date.set(Calendar.DAY_OF_MONTH-1, 1);
        String dateLimit = ""+date.getTimeInMillis();
        String phoneNumber = params.getString("phoneNo");
        String query = String.format("\"SELECT sum(amount),type FROM transactions where (accountNumber LIKE '%s||%%' and date > %s) group by type\"",phoneNumber,dateLimit);
        String result = esService.getData(query);
        JSONArray data = JSON.parseObject(result).getJSONArray("rows");
        JSONObject dict1 = new JSONObject();
        dict1.put("label","Credited");
        dict1.put("Value",""+((JSONArray)data.get(1)).get(0).toString());
        response.add(dict1);
        JSONObject dict = new JSONObject();
        dict.put("label","Debited");
        dict.put("Value",""+((JSONArray)data.get(0)).get(0).toString());
        response.add(dict);
        return response;
    }

    public JSONArray getLineChartData( JSONObject params) {
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");

        JSONArray response = new JSONArray();
        Calendar date = Calendar.getInstance();
        date.set(Calendar.DAY_OF_MONTH, 1);
        String phoneNumber = params.getString("phoneNo");
        String query = String.format("\"SELECT * FROM transactions where (accountNumber LIKE '%s||%%' and type='0' and date > %s) order by date desc\"",phoneNumber,date.getTimeInMillis());
        String result = esService.getData(query);
        JSONArray data = JSON.parseObject(result).getJSONArray("rows");
        JSONObject dict = new JSONObject();
        for(Object item:data){
//            JSONObject obj = new JSONObject();
            String amount = ((JSONArray)item).get(2).toString();
            String objDate = ((JSONArray)item).get(3).toString();
            long milliSeconds= Long.parseLong(objDate);
            System.out.println(milliSeconds);

            Calendar calendar = Calendar.getInstance();
            calendar.setTimeInMillis(milliSeconds);
            //Date formattedDate = new Date(objDate);
            String strDate= formatter.format(calendar.getTime());
//            obj.put("label",strDate);
            if(StringUtils.isEmpty(dict.get(strDate))) {
                dict.put(strDate, amount);
            }
            else{
                String val = dict.get(strDate).toString();
                dict.put(strDate,Double.parseDouble(val)+Double.parseDouble(amount));
            }
//            response.add(obj);
        }
        for (Object item:data){
            String objDate = ((JSONArray)item).get(3).toString();
            long milliSeconds= Long.parseLong(objDate);
            System.out.println(milliSeconds);

            Calendar calendar = Calendar.getInstance();
            calendar.setTimeInMillis(milliSeconds);
            //Date formattedDate = new Date(objDate);
            String strDate= formatter.format(calendar.getTime());
            if(StringUtils.isEmpty(dict.get(strDate))) {
                continue;
            }

            JSONObject json = new JSONObject();
            json.put("label",strDate);
            json.put("value",dict.get(strDate).toString());
            dict.remove(strDate);
            response.add(json);
        }
        Collections.reverse(response);
        return response;
    }

    public JSONArray getPieChartData(JSONObject params){
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");

        JSONArray response = new JSONArray();
        Calendar date = Calendar.getInstance();
        date.set(Calendar.DAY_OF_MONTH-1, 1);
        String dateLimit = ""+date.getTimeInMillis();
        String phoneNumber = params.getString("phoneNo");
        String query = String.format("\"SELECT SUM(amount),paidToCategory FROM transactions where (accountNumber LIKE '%s||%%' and date > %s) group by paidToCategory\"",phoneNumber,dateLimit);
        String result = esService.getData(query);
        JSONArray data = JSON.parseObject(result).getJSONArray("rows");
        for(int i=0;i<data.size();i++){
            JSONObject dict = new JSONObject();
            dict.put("label",((JSONArray)data.get(i)).get(1));
            dict.put("value",((JSONArray)data.get(i)).get(0));
            response.add(dict);
        }
        return response;
    }

    public JSONArray getAllTransactions(JSONObject params) throws ParseException {
        JSONArray response = new JSONArray();
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
        String phoneNumber = params.getString("phoneNumber");
        String query = String.format("\"SELECT * FROM transactions where (accountNumber LIKE '%s||%%') order by date desc\"",phoneNumber);
        String result = esService.getData(query);
        JSONArray data = JSON.parseObject(result).getJSONArray("rows");
        for(int i=0;i<data.size();i++){
            JSONObject dict = new JSONObject();
            long milliSeconds= Long.parseLong(((JSONArray)data.get(i)).get(3).toString());
            Calendar calendar = Calendar.getInstance();
            calendar.setTimeInMillis(milliSeconds);
            //System.out.println(formatter.format(calendar.getTime()));

            dict.put("paidTo",((JSONArray)data.get(i)).get(5));
            dict.put("paidToCategory",((JSONArray)data.get(i)).get(6));
            dict.put("type",((JSONArray)data.get(i)).get(9).toString().equals("1")?"Credited":"Debited");
            dict.put("amount",""+((JSONArray)data.get(i)).get(2));
            dict.put("date",formatter.format(calendar.getTime()));


            response.add(dict);
        }
        return response;
    }
}
