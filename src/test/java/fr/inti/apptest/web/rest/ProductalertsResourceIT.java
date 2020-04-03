package fr.inti.apptest.web.rest;

import fr.inti.apptest.ApplicationpanierApp;
import fr.inti.apptest.domain.Productalerts;
import fr.inti.apptest.repository.ProductalertsRepository;
import fr.inti.apptest.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.validation.Validator;


import java.util.List;

import static fr.inti.apptest.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ProductalertsResource} REST controller.
 */
@SpringBootTest(classes = ApplicationpanierApp.class)
public class ProductalertsResourceIT {

    @Autowired
    private ProductalertsRepository productalertsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restProductalertsMockMvc;

    private Productalerts productalerts;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProductalertsResource productalertsResource = new ProductalertsResource(productalertsRepository);
        this.restProductalertsMockMvc = MockMvcBuilders.standaloneSetup(productalertsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Productalerts createEntity() {
        Productalerts productalerts = new Productalerts();
        return productalerts;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Productalerts createUpdatedEntity() {
        Productalerts productalerts = new Productalerts();
        return productalerts;
    }

    @BeforeEach
    public void initTest() {
        productalertsRepository.deleteAll();
        productalerts = createEntity();
    }

    @Test
    public void createProductalerts() throws Exception {
        int databaseSizeBeforeCreate = productalertsRepository.findAll().size();

        // Create the Productalerts
        restProductalertsMockMvc.perform(post("/api/productalerts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productalerts)))
            .andExpect(status().isCreated());

        // Validate the Productalerts in the database
        List<Productalerts> productalertsList = productalertsRepository.findAll();
        assertThat(productalertsList).hasSize(databaseSizeBeforeCreate + 1);
        Productalerts testProductalerts = productalertsList.get(productalertsList.size() - 1);
    }

    @Test
    public void createProductalertsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productalertsRepository.findAll().size();

        // Create the Productalerts with an existing ID
        productalerts.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductalertsMockMvc.perform(post("/api/productalerts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productalerts)))
            .andExpect(status().isBadRequest());

        // Validate the Productalerts in the database
        List<Productalerts> productalertsList = productalertsRepository.findAll();
        assertThat(productalertsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllProductalerts() throws Exception {
        // Initialize the database
        productalertsRepository.save(productalerts);

        // Get all the productalertsList
        restProductalertsMockMvc.perform(get("/api/productalerts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productalerts.getId())));
    }
    
    @Test
    public void getProductalerts() throws Exception {
        // Initialize the database
        productalertsRepository.save(productalerts);

        // Get the productalerts
        restProductalertsMockMvc.perform(get("/api/productalerts/{id}", productalerts.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(productalerts.getId()));
    }

    @Test
    public void getNonExistingProductalerts() throws Exception {
        // Get the productalerts
        restProductalertsMockMvc.perform(get("/api/productalerts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateProductalerts() throws Exception {
        // Initialize the database
        productalertsRepository.save(productalerts);

        int databaseSizeBeforeUpdate = productalertsRepository.findAll().size();

        // Update the productalerts
        Productalerts updatedProductalerts = productalertsRepository.findById(productalerts.getId()).get();

        restProductalertsMockMvc.perform(put("/api/productalerts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProductalerts)))
            .andExpect(status().isOk());

        // Validate the Productalerts in the database
        List<Productalerts> productalertsList = productalertsRepository.findAll();
        assertThat(productalertsList).hasSize(databaseSizeBeforeUpdate);
        Productalerts testProductalerts = productalertsList.get(productalertsList.size() - 1);
    }

    @Test
    public void updateNonExistingProductalerts() throws Exception {
        int databaseSizeBeforeUpdate = productalertsRepository.findAll().size();

        // Create the Productalerts

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductalertsMockMvc.perform(put("/api/productalerts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productalerts)))
            .andExpect(status().isBadRequest());

        // Validate the Productalerts in the database
        List<Productalerts> productalertsList = productalertsRepository.findAll();
        assertThat(productalertsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteProductalerts() throws Exception {
        // Initialize the database
        productalertsRepository.save(productalerts);

        int databaseSizeBeforeDelete = productalertsRepository.findAll().size();

        // Delete the productalerts
        restProductalertsMockMvc.perform(delete("/api/productalerts/{id}", productalerts.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Productalerts> productalertsList = productalertsRepository.findAll();
        assertThat(productalertsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
