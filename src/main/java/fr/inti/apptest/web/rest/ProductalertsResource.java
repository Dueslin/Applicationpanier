package fr.inti.apptest.web.rest;

import fr.inti.apptest.domain.Productalerts;
import fr.inti.apptest.repository.ProductalertsRepository;
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
 * REST controller for managing {@link fr.inti.apptest.domain.Productalerts}.
 */
@RestController
@RequestMapping("/api")
public class ProductalertsResource {

    private final Logger log = LoggerFactory.getLogger(ProductalertsResource.class);

    private static final String ENTITY_NAME = "productalerts";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProductalertsRepository productalertsRepository;

    public ProductalertsResource(ProductalertsRepository productalertsRepository) {
        this.productalertsRepository = productalertsRepository;
    }

    /**
     * {@code POST  /productalerts} : Create a new productalerts.
     *
     * @param productalerts the productalerts to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new productalerts, or with status {@code 400 (Bad Request)} if the productalerts has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/productalerts")
    public ResponseEntity<Productalerts> createProductalerts(@RequestBody Productalerts productalerts) throws URISyntaxException {
        log.debug("REST request to save Productalerts : {}", productalerts);
        if (productalerts.getId() != null) {
            throw new BadRequestAlertException("A new productalerts cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Productalerts result = productalertsRepository.save(productalerts);
        return ResponseEntity.created(new URI("/api/productalerts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /productalerts} : Updates an existing productalerts.
     *
     * @param productalerts the productalerts to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated productalerts,
     * or with status {@code 400 (Bad Request)} if the productalerts is not valid,
     * or with status {@code 500 (Internal Server Error)} if the productalerts couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/productalerts")
    public ResponseEntity<Productalerts> updateProductalerts(@RequestBody Productalerts productalerts) throws URISyntaxException {
        log.debug("REST request to update Productalerts : {}", productalerts);
        if (productalerts.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Productalerts result = productalertsRepository.save(productalerts);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, productalerts.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /productalerts} : get all the productalerts.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of productalerts in body.
     */
    @GetMapping("/productalerts")
    public List<Productalerts> getAllProductalerts() {
        log.debug("REST request to get all Productalerts");
        return productalertsRepository.findAll();
    }

    /**
     * {@code GET  /productalerts/:id} : get the "id" productalerts.
     *
     * @param id the id of the productalerts to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the productalerts, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/productalerts/{id}")
    public ResponseEntity<Productalerts> getProductalerts(@PathVariable String id) {
        log.debug("REST request to get Productalerts : {}", id);
        Optional<Productalerts> productalerts = productalertsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(productalerts);
    }

    /**
     * {@code DELETE  /productalerts/:id} : delete the "id" productalerts.
     *
     * @param id the id of the productalerts to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/productalerts/{id}")
    public ResponseEntity<Void> deleteProductalerts(@PathVariable String id) {
        log.debug("REST request to delete Productalerts : {}", id);
        productalertsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }
}
