package org.example.SmartSave.Repository;

import org.example.SmartSave.Model.Bank;
import org.example.SmartSave.Model.Budget;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface BankRepository extends ElasticsearchRepository<Bank, String> {
}
