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
    @Field(type=FieldType.Keyword)
    private String category;
    @Field(type= FieldType.Binary)
    private String categoryImage;

    public String getCategoryImage() {
        return categoryImage;
    }

    public void setCategoryImage(String categoryImage) {
        this.categoryImage = categoryImage;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
