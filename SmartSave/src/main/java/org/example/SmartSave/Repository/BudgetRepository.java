package org.example.SmartSave.Repository;

import org.example.SmartSave.Model.Budget;
import org.example.SmartSave.Model.Transaction;
import org.example.SmartSave.Model.UserProfile;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.io.Serializable;
import java.util.List;

public interface BudgetRepository extends ElasticsearchRepository<Budget, String> {

}