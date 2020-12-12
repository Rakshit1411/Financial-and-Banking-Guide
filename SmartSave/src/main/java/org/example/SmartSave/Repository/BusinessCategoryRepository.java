package org.example.SmartSave.Repository;

import org.example.SmartSave.Model.BusinessCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


public interface BusinessCategoryRepository extends ElasticsearchRepository<BusinessCategory, String> {

}
