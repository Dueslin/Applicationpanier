package fr.inti.apptest.web.rest;

import fr.inti.apptest.domain.Productlist;
import fr.inti.apptest.repository.ProductlistRepository;
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
 * REST controller for managing {@link fr.inti.apptest.domain.Productlist}.
 */
@RestController
@RequestMapping("/api")
public class ProductlistResource {

    private final Logger log = LoggerFactory.getLogger(ProductlistResource.class);

    private static final String ENTITY_NAME = "productlist";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProductlistRepository productlistRepository;

    public ProductlistResource(ProductlistRepository productlistRepository) {
        this.productlistRepository = productlistRepository;
    }

    /**
     * {@code POST  /productlists} : Create a new productlist.
     *
     * @param productlist the productlist to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new productlist, or with status {@code 400 (Bad Request)} if the productlist has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/productlists")
    public ResponseEntity<Productlist> createProductlist(@RequestBody Productlist productlist) throws URISyntaxException {
        log.debug("REST request to save Productlist : {}", productlist);
        if (productlist.getId() != null) {
            throw new BadRequestAlertException("A new productlist cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Productlist result = productlistRepository.save(productlist);
        return ResponseEntity.created(new URI("/api/productlists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /productlists} : Updates an existing productlist.
     *
     * @param productlist the productlist to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated productlist,
     * or with status {@code 400 (Bad Request)} if the productlist is not valid,
     * or with status {@code 500 (Internal Server Error)} if the productlist couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/productlists")
    public ResponseEntity<Productlist> updateProductlist(@RequestBody Productlist productlist) throws URISyntaxException {
        log.debug("REST request to update Productlist : {}", productlist);
        if (productlist.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Productlist result = productlistRepository.save(productlist);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, productlist.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /productlists} : get all the productlists.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of productlists in body.
     */
    @GetMapping("/productlists")
    public List<Productlist> getAllProductlists() {
        log.debug("REST request to get all Productlists");
        return productlistRepository.findAll();
    }

    /**
     * {@code GET  /productlists/:id} : get the "id" productlist.
     *
     * @param id the id of the productlist to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the productlist, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/productlists/{id}")
    public ResponseEntity<Productlist> getProductlist(@PathVariable String id) {
        log.debug("REST request to get Productlist : {}", id);
        Optional<Productlist> productlist = productlistRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(productlist);
    }

    /**
     * {@code DELETE  /productlists/:id} : delete the "id" productlist.
     *
     * @param id the id of the productlist to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/productlists/{id}")
    public ResponseEntity<Void> deleteProductlist(@PathVariable String id) {
        log.debug("REST request to delete Productlist : {}", id);
        productlistRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }
}
