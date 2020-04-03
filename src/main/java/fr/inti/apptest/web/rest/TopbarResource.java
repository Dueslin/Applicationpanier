package fr.inti.apptest.web.rest;

import fr.inti.apptest.domain.Topbar;
import fr.inti.apptest.repository.TopbarRepository;
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
 * REST controller for managing {@link fr.inti.apptest.domain.Topbar}.
 */
@RestController
@RequestMapping("/api")
public class TopbarResource {

    private final Logger log = LoggerFactory.getLogger(TopbarResource.class);

    private static final String ENTITY_NAME = "topbar";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TopbarRepository topbarRepository;

    public TopbarResource(TopbarRepository topbarRepository) {
        this.topbarRepository = topbarRepository;
    }

    /**
     * {@code POST  /topbars} : Create a new topbar.
     *
     * @param topbar the topbar to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new topbar, or with status {@code 400 (Bad Request)} if the topbar has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/topbars")
    public ResponseEntity<Topbar> createTopbar(@RequestBody Topbar topbar) throws URISyntaxException {
        log.debug("REST request to save Topbar : {}", topbar);
        if (topbar.getId() != null) {
            throw new BadRequestAlertException("A new topbar cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Topbar result = topbarRepository.save(topbar);
        return ResponseEntity.created(new URI("/api/topbars/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /topbars} : Updates an existing topbar.
     *
     * @param topbar the topbar to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated topbar,
     * or with status {@code 400 (Bad Request)} if the topbar is not valid,
     * or with status {@code 500 (Internal Server Error)} if the topbar couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/topbars")
    public ResponseEntity<Topbar> updateTopbar(@RequestBody Topbar topbar) throws URISyntaxException {
        log.debug("REST request to update Topbar : {}", topbar);
        if (topbar.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Topbar result = topbarRepository.save(topbar);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, topbar.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /topbars} : get all the topbars.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of topbars in body.
     */
    @GetMapping("/topbars")
    public List<Topbar> getAllTopbars() {
        log.debug("REST request to get all Topbars");
        return topbarRepository.findAll();
    }

    /**
     * {@code GET  /topbars/:id} : get the "id" topbar.
     *
     * @param id the id of the topbar to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the topbar, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/topbars/{id}")
    public ResponseEntity<Topbar> getTopbar(@PathVariable String id) {
        log.debug("REST request to get Topbar : {}", id);
        Optional<Topbar> topbar = topbarRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(topbar);
    }

    /**
     * {@code DELETE  /topbars/:id} : delete the "id" topbar.
     *
     * @param id the id of the topbar to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/topbars/{id}")
    public ResponseEntity<Void> deleteTopbar(@PathVariable String id) {
        log.debug("REST request to delete Topbar : {}", id);
        topbarRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }
}
