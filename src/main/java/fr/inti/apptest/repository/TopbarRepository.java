package fr.inti.apptest.repository;

import fr.inti.apptest.domain.Topbar;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Topbar entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TopbarRepository extends MongoRepository<Topbar, String> {

}
