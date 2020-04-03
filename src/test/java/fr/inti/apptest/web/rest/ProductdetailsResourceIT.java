package fr.inti.apptest.web.rest;

import fr.inti.apptest.ApplicationpanierApp;
import fr.inti.apptest.domain.Productdetails;
import fr.inti.apptest.repository.ProductdetailsRepository;
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
 * Integration tests for the {@link ProductdetailsResource} REST controller.
 */
@SpringBootTest(classes = ApplicationpanierApp.class)
public class ProductdetailsResourceIT {

    @Autowired
    private ProductdetailsRepository productdetailsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restProductdetailsMockMvc;

    private Productdetails productdetails;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProductdetailsResource productdetailsResource = new ProductdetailsResource(productdetailsRepository);
        this.restProductdetailsMockMvc = MockMvcBuilders.standaloneSetup(productdetailsResource)
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
    public static Productdetails createEntity() {
        Productdetails productdetails = new Productdetails();
        return productdetails;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Productdetails createUpdatedEntity() {
        Productdetails productdetails = new Productdetails();
        return productdetails;
    }

    @BeforeEach
    public void initTest() {
        productdetailsRepository.deleteAll();
        productdetails = createEntity();
    }

    @Test
    public void createProductdetails() throws Exception {
        int databaseSizeBeforeCreate = productdetailsRepository.findAll().size();

        // Create the Productdetails
        restProductdetailsMockMvc.perform(post("/api/productdetails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productdetails)))
            .andExpect(status().isCreated());

        // Validate the Productdetails in the database
        List<Productdetails> productdetailsList = productdetailsRepository.findAll();
        assertThat(productdetailsList).hasSize(databaseSizeBeforeCreate + 1);
        Productdetails testProductdetails = productdetailsList.get(productdetailsList.size() - 1);
    }

    @Test
    public void createProductdetailsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productdetailsRepository.findAll().size();

        // Create the Productdetails with an existing ID
        productdetails.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductdetailsMockMvc.perform(post("/api/productdetails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productdetails)))
            .andExpect(status().isBadRequest());

        // Validate the Productdetails in the database
        List<Productdetails> productdetailsList = productdetailsRepository.findAll();
        assertThat(productdetailsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllProductdetails() throws Exception {
        // Initialize the database
        productdetailsRepository.save(productdetails);

        // Get all the productdetailsList
        restProductdetailsMockMvc.perform(get("/api/productdetails?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productdetails.getId())));
    }
    
    @Test
    public void getProductdetails() throws Exception {
        // Initialize the database
        productdetailsRepository.save(productdetails);

        // Get the productdetails
        restProductdetailsMockMvc.perform(get("/api/productdetails/{id}", productdetails.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(productdetails.getId()));
    }

    @Test
    public void getNonExistingProductdetails() throws Exception {
        // Get the productdetails
        restProductdetailsMockMvc.perform(get("/api/productdetails/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateProductdetails() throws Exception {
        // Initialize the database
        productdetailsRepository.save(productdetails);

        int databaseSizeBeforeUpdate = productdetailsRepository.findAll().size();

        // Update the productdetails
        Productdetails updatedProductdetails = productdetailsRepository.findById(productdetails.getId()).get();

        restProductdetailsMockMvc.perform(put("/api/productdetails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProductdetails)))
            .andExpect(status().isOk());

        // Validate the Productdetails in the database
        List<Productdetails> productdetailsList = productdetailsRepository.findAll();
        assertThat(productdetailsList).hasSize(databaseSizeBeforeUpdate);
        Productdetails testProductdetails = productdetailsList.get(productdetailsList.size() - 1);
    }

    @Test
    public void updateNonExistingProductdetails() throws Exception {
        int databaseSizeBeforeUpdate = productdetailsRepository.findAll().size();

        // Create the Productdetails

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductdetailsMockMvc.perform(put("/api/productdetails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productdetails)))
            .andExpect(status().isBadRequest());

        // Validate the Productdetails in the database
        List<Productdetails> productdetailsList = productdetailsRepository.findAll();
        assertThat(productdetailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteProductdetails() throws Exception {
        // Initialize the database
        productdetailsRepository.save(productdetails);

        int databaseSizeBeforeDelete = productdetailsRepository.findAll().size();

        // Delete the productdetails
        restProductdetailsMockMvc.perform(delete("/api/productdetails/{id}", productdetails.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Productdetails> productdetailsList = productdetailsRepository.findAll();
        assertThat(productdetailsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
