package fr.inti.apptest.web.rest;

import fr.inti.apptest.domain.Productdetails;
import fr.inti.apptest.repository.ProductdetailsRepository;
import fr.inti.apptest.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link fr.inti.apptest.domain.Productdetails}.
 */
@RestController
@RequestMapping("/api")
public class ProductdetailsResource {

    private final Logger log = LoggerFactory.getLogger(ProductdetailsResource.class);

    private static final String ENTITY_NAME = "productdetails";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProductdetailsRepository productdetailsRepository;

    public ProductdetailsResource(ProductdetailsRepository productdetailsRepository) {
        this.productdetailsRepository = productdetailsRepository;
    }

    /**
     * {@code POST  /productdetails} : Create a new productdetails.
     *
     * @param productdetails the productdetails to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new productdetails, or with status {@code 400 (Bad Request)} if the productdetails has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/productdetails")
    public ResponseEntity<Productdetails> createProductdetails(@RequestBody Productdetails productdetails) throws URISyntaxException {
        log.debug("REST request to save Productdetails : {}", productdetails);
        if (productdetails.getId() != null) {
            throw new BadRequestAlertException("A new productdetails cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Productdetails result = productdetailsRepository.save(productdetails);
        return ResponseEntity.created(new URI("/api/productdetails/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /productdetails} : Updates an existing productdetails.
     *
     * @param productdetails the productdetails to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated productdetails,
     * or with status {@code 400 (Bad Request)} if the productdetails is not valid,
     * or with status {@code 500 (Internal Server Error)} if the productdetails couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/productdetails")
    public ResponseEntity<Productdetails> updateProductdetails(@RequestBody Productdetails productdetails) throws URISyntaxException {
        log.debug("REST request to update Productdetails : {}", productdetails);
        if (productdetails.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Productdetails result = productdetailsRepository.save(productdetails);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, productdetails.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /productdetails} : get all the productdetails.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of productdetails in body.
     */
    @GetMapping("/productdetails")
    public List<Productdetails> getAllProductdetails() {
        log.debug("REST request to get all Productdetails");
        return productdetailsRepository.findAll();
    }

    /**
     * {@code GET  /productdetails/:id} : get the "id" productdetails.
     *
     * @param id the id of the productdetails to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the productdetails, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/productdetails/{id}")
    public ResponseEntity<Productdetails> getProductdetails(@PathVariable String id) {
        log.debug("REST request to get Productdetails : {}", id);
        Optional<Productdetails> productdetails = productdetailsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(productdetails);
    }

    /**
     * {@code DELETE  /productdetails/:id} : delete the "id" productdetails.
     *
     * @param id the id of the productdetails to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/productdetails/{id}")
    public ResponseEntity<Void> deleteProductdetails(@PathVariable String id) {
        log.debug("REST request to delete Productdetails : {}", id);
        productdetailsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }
}
