package org.example.SmartSave.Services.Common;

import com.alibaba.fastjson.JSONObject;
import org.apache.http.HttpHost;
import org.apache.http.util.EntityUtils;
import org.elasticsearch.action.update.UpdateRequest;
import org.elasticsearch.client.Request;
import org.elasticsearch.client.Response;
import org.elasticsearch.client.RestClient;
import org.example.SmartSave.Model.UserProfile;
import org.example.SmartSave.Services.UserProfile.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.elasticsearch.client.reactive.ReactiveElasticsearchClient;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.ReactiveElasticsearchOperations;
import org.springframework.data.elasticsearch.core.ReactiveElasticsearchTemplate;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;
import org.springframework.data.elasticsearch.core.query.*;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.IOException;

import static org.elasticsearch.index.query.QueryBuilders.regexpQuery;

@Service
public class EsService {
    @Autowired
    ElasticsearchOperations elasticsearchTemplate;
    @Autowired
    UserProfileService userProfileService;
    @Value( "${spring.data.elasticsearch.cluster-nodes}" )
    String esUrl;
    public String getData(String query){
        RestClient restClient = RestClient.builder(
                new HttpHost(esUrl.substring(0,esUrl.indexOf(":")), 9200, "http")).build();

        Request request = new Request("POST",  "/_sql");
        request.setJsonEntity("{\"query\":"+query+"}");
        Response response = null;
        try {
            response = restClient.performRequest(request);
            String responseBody = EntityUtils.toString(response.getEntity());
            System.out.println(responseBody);
            restClient.close();
            return responseBody;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "Failed";
    }

    public String update(String phoneNumber){
//        ReactiveElasticsearchOperations operations = new ReactiveElasticsearchTemplate(new ReactiveElasticsearchClient(), elasticsearchConverter());
//        Criteria criteria = new Criteria("lastname").is("Miller")
//                .and("firstname").is("James");
//        Query query = new CriteriaQuery(criteria);
//        SearchHits<UserProfile> searchHits = operations.search(query, Person.class);
        Query searchQuery = new NativeSearchQueryBuilder()
                .withFilter(regexpQuery("phoneNumber", "9888138824"))
                .build();
        SearchHits<UserProfile> users =
                elasticsearchTemplate.search(searchQuery, UserProfile.class);
        UserProfile user = users.getSearchHit(0).getContent();
        user.setDataSyncTime("test");
//        userProfileService.save(user);
        return "SUCCESS";
    }
}
