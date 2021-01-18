package org.example.SmartSave.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

@Document(indexName = "fixeddeposit", replicas=0, refreshInterval = "-1")
public class FixedDeposit implements Serializable, Cloneable {
    @Id
    @Field(type = FieldType.Keyword, fielddata = true)
    private String id;
    @Field(type = FieldType.Keyword)
    private String bank; //LoggedInUserID||<acc no>(last 4 digits)
    @Field(type = FieldType.Nested)
    private List<Map<String,String>> data;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getBank() {
        return bank;
    }

    public void setBank(String bank) {
        this.bank = bank;
    }

    public List<Map<String, String>> getData() {
        return data;
    }

    public void setData(List<Map<String, String>> data) {
        this.data = data;
    }
}