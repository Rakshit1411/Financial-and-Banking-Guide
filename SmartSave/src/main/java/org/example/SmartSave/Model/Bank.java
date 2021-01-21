package org.example.SmartSave.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Document(indexName = "bank", replicas=0, refreshInterval = "-1")
public class Bank {
    @Id
    @Field(type= FieldType.Keyword,fielddata = true)
    private String id;
    @Field(type=FieldType.Keyword)
    private String name;
    @Field(type=FieldType.Keyword)
    private String shortName;
    @Field(type=FieldType.Keyword)
    private String interestRate;
    @Field(type=FieldType.Keyword)
    private String fdId;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public String getInterestRate() {
        return interestRate;
    }

    public void setInterestRate(String interestRate) {
        this.interestRate = interestRate;
    }

    public String getFdId() {
        return fdId;
    }

    public void setFdId(String fdId) {
        this.fdId = fdId;
    }
}
