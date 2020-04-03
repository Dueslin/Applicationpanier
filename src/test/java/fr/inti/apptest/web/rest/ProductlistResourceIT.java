package fr.inti.apptest.web.rest;

import fr.inti.apptest.ApplicationpanierApp;
import fr.inti.apptest.domain.Productlist;
import fr.inti.apptest.repository.ProductlistRepository;
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
 * Integration tests for the {@link ProductlistResource} REST controller.
 */
@SpringBootTest(classes = ApplicationpanierApp.class)
public class ProductlistResourceIT {

    @Autowired
    private ProductlistRepository productlistRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restProductlistMockMvc;

    private Productlist productlist;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProductlistResource productlistResource = new ProductlistResource(productlistRepository);
        this.restProductlistMockMvc = MockMvcBuilders.standaloneSetup(productlistResource)
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
    public static Productlist createEntity() {
        Productlist productlist = new Productlist();
        return productlist;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Productlist createUpdatedEntity() {
        Productlist productlist = new Productlist();
        return productlist;
    }

    @BeforeEach
    public void initTest() {
        productlistRepository.deleteAll();
        productlist = createEntity();
    }

    @Test
    public void createProductlist() throws Exception {
        int databaseSizeBeforeCreate = productlistRepository.findAll().size();

        // Create the Productlist
        restProductlistMockMvc.perform(post("/api/productlists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productlist)))
            .andExpect(status().isCreated());

        // Validate the Productlist in the database
        List<Productlist> productlistList = productlistRepository.findAll();
        assertThat(productlistList).hasSize(databaseSizeBeforeCreate + 1);
        Productlist testProductlist = productlistList.get(productlistList.size() - 1);
    }

    @Test
    public void createProductlistWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productlistRepository.findAll().size();

        // Create the Productlist with an existing ID
        productlist.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductlistMockMvc.perform(post("/api/productlists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productlist)))
            .andExpect(status().isBadRequest());

        // Validate the Productlist in the database
        List<Productlist> productlistList = productlistRepository.findAll();
        assertThat(productlistList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllProductlists() throws Exception {
        // Initialize the database
        productlistRepository.save(productlist);

        // Get all the productlistList
        restProductlistMockMvc.perform(get("/api/productlists?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productlist.getId())));
    }
    
    @Test
    public void getProductlist() throws Exception {
        // Initialize the database
        productlistRepository.save(productlist);

        // Get the productlist
        restProductlistMockMvc.perform(get("/api/productlists/{id}", productlist.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(productlist.getId()));
    }

    @Test
    public void getNonExistingProductlist() throws Exception {
        // Get the productlist
        restProductlistMockMvc.perform(get("/api/productlists/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateProductlist() throws Exception {
        // Initialize the database
        productlistRepository.save(productlist);

        int databaseSizeBeforeUpdate = productlistRepository.findAll().size();

        // Update the productlist
        Productlist updatedProductlist = productlistRepository.findById(productlist.getId()).get();

        restProductlistMockMvc.perform(put("/api/productlists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProductlist)))
            .andExpect(status().isOk());

        // Validate the Productlist in the database
        List<Productlist> productlistList = productlistRepository.findAll();
        assertThat(productlistList).hasSize(databaseSizeBeforeUpdate);
        Productlist testProductlist = productlistList.get(productlistList.size() - 1);
    }

    @Test
    public void updateNonExistingProductlist() throws Exception {
        int databaseSizeBeforeUpdate = productlistRepository.findAll().size();

        // Create the Productlist

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductlistMockMvc.perform(put("/api/productlists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productlist)))
            .andExpect(status().isBadRequest());

        // Validate the Productlist in the database
        List<Productlist> productlistList = productlistRepository.findAll();
        assertThat(productlistList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteProductlist() throws Exception {
        // Initialize the database
        productlistRepository.save(productlist);

        int databaseSizeBeforeDelete = productlistRepository.findAll().size();

        // Delete the productlist
        restProductlistMockMvc.perform(delete("/api/productlists/{id}", productlist.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Productlist> productlistList = productlistRepository.findAll();
        assertThat(productlistList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
