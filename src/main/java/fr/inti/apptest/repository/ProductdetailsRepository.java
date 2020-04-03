package fr.inti.apptest.repository;

import fr.inti.apptest.domain.Productdetails;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Productdetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductdetailsRepository extends MongoRepository<Productdetails, String> {

}
