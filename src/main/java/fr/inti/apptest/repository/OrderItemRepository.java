package fr.inti.apptest.repository;

import fr.inti.apptest.domain.OrderItem;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the OrderItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderItemRepository extends MongoRepository<OrderItem, String> {

}
