package org.example.SmartSave.Repository;

import org.example.SmartSave.Model.Transaction;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.io.Serializable;
import java.util.List;

public interface SmsRepository extends ElasticsearchRepository<Transaction, String> {

    List<Transaction> findByDate(String date);
}