package org.example.SmartSave.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

@Document(indexName = "transactions", replicas=0, refreshInterval = "-1")
public class Transaction implements Serializable, Cloneable {
    //private static final long serialVersionUID=1L;

    @Id
    @Field(type= FieldType.Keyword,fielddata = true)
    private String id;
    @Field(type= FieldType.Keyword)
    private String accountNumber; //LoggedInUserID(PHONENO)||<acc no>(last 3 digits)
    @Field(type=FieldType.Double)
    private Double amount;
    private String date;
    private String type; //Debit->0,Credit->1
    @Field(type= FieldType.Keyword)
    private String sender;
    @Field(type= FieldType.Text)
    private String rawBody;
    @Field(type= FieldType.Keyword)
    private String paidTo;
    @Field(type= FieldType.Keyword)
    private String paidToCategory;

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getPaidTo() {
        return paidTo;
    }

    public void setPaidTo(String paidTo) {
        this.paidTo = paidTo;
    }

    public String getPaidToCategory() {
        return paidToCategory;
    }

    public void setPaidToCategory(String paidToCategory) {
        this.paidToCategory = paidToCategory;
    }

    public String getRawBody() {
        return rawBody;
    }

    public void setRawBody(String rawBody) {
        this.rawBody = rawBody;
    }

    public String getAccountNumber() {
        return accountNumber;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }



    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }
}
