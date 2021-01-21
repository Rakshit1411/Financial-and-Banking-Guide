package org.example.SmartSave.Repository;

import org.example.SmartSave.Model.Budget;
import org.example.SmartSave.Model.FixedDeposit;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface FixedDepositRepository extends ElasticsearchRepository<FixedDeposit, String> {
}
