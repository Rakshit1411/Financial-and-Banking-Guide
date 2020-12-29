package org.example.SmartSave.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Document(indexName = "budget", replicas=0, refreshInterval = "-1")
public class Budget {

    @Id
    @Field(type= FieldType.Keyword,fielddata = true)
    private String id;
    @Field(type=FieldType.Text)
    private String categoryId;
    @Field(type=FieldType.Text)
    private String amountThreshold;
    @Field(type=FieldType.Keyword)
    private String userId;
    private String calDate;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getCalDate() {
        return calDate;
    }

    public void setCalDate(String calDate) {
        this.calDate = calDate;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }

    public String getAmountThreshold() {
        return amountThreshold;
    }

    public void setAmountThreshold(String amountThreshold) {
        this.amountThreshold = amountThreshold;
    }
}
