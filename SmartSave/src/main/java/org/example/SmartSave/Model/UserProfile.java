package org.example.SmartSave.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.io.Serializable;

@Document(indexName = "userprofile", replicas=0, refreshInterval = "-1")
public class UserProfile implements Serializable, Cloneable {
    @Id
    @Field(type= FieldType.Keyword,fielddata = true)
    private String id;
    @Field(type= FieldType.Keyword)
    private String username; //LoggedInUserID||<acc no>(last 4 digits)
    @Field(type=FieldType.Keyword)
    private String phoneNumber;
    @Field(type= FieldType.Keyword)
    private String password;
    @Field(type= FieldType.Keyword)
    private String fullName;
    private String dataSyncTime;
    @Field(type= FieldType.Binary)
    private String profileImage;

    public String getDataSyncTime() {
        return dataSyncTime;
    }

    public void setDataSyncTime(String dataSyncTime) {
        this.dataSyncTime = dataSyncTime;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
}
