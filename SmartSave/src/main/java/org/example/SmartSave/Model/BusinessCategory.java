package org.example.SmartSave.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Document(indexName = "businesscategory", replicas=0, refreshInterval = "-1")
public class BusinessCategory {

    @Id
    @Field(type= FieldType.Keyword,fielddata = true)
    private String id;
    @Field(type= FieldType.Keyword)
    private String name;
    @Field(type=FieldType.Keyword)
    private String category;

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

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
