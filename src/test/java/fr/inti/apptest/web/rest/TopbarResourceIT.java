package fr.inti.apptest.web.rest;

import fr.inti.apptest.ApplicationpanierApp;
import fr.inti.apptest.domain.Topbar;
import fr.inti.apptest.repository.TopbarRepository;
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
 * Integration tests for the {@link TopbarResource} REST controller.
 */
@SpringBootTest(classes = ApplicationpanierApp.class)
public class TopbarResourceIT {

    @Autowired
    private TopbarRepository topbarRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restTopbarMockMvc;

    private Topbar topbar;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TopbarResource topbarResource = new TopbarResource(topbarRepository);
        this.restTopbarMockMvc = MockMvcBuilders.standaloneSetup(topbarResource)
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
    public static Topbar createEntity() {
        Topbar topbar = new Topbar();
        return topbar;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Topbar createUpdatedEntity() {
        Topbar topbar = new Topbar();
        return topbar;
    }

    @BeforeEach
    public void initTest() {
        topbarRepository.deleteAll();
        topbar = createEntity();
    }

    @Test
    public void createTopbar() throws Exception {
        int databaseSizeBeforeCreate = topbarRepository.findAll().size();

        // Create the Topbar
        restTopbarMockMvc.perform(post("/api/topbars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(topbar)))
            .andExpect(status().isCreated());

        // Validate the Topbar in the database
        List<Topbar> topbarList = topbarRepository.findAll();
        assertThat(topbarList).hasSize(databaseSizeBeforeCreate + 1);
        Topbar testTopbar = topbarList.get(topbarList.size() - 1);
    }

    @Test
    public void createTopbarWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = topbarRepository.findAll().size();

        // Create the Topbar with an existing ID
        topbar.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restTopbarMockMvc.perform(post("/api/topbars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(topbar)))
            .andExpect(status().isBadRequest());

        // Validate the Topbar in the database
        List<Topbar> topbarList = topbarRepository.findAll();
        assertThat(topbarList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllTopbars() throws Exception {
        // Initialize the database
        topbarRepository.save(topbar);

        // Get all the topbarList
        restTopbarMockMvc.perform(get("/api/topbars?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(topbar.getId())));
    }
    
    @Test
    public void getTopbar() throws Exception {
        // Initialize the database
        topbarRepository.save(topbar);

        // Get the topbar
        restTopbarMockMvc.perform(get("/api/topbars/{id}", topbar.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(topbar.getId()));
    }

    @Test
    public void getNonExistingTopbar() throws Exception {
        // Get the topbar
        restTopbarMockMvc.perform(get("/api/topbars/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateTopbar() throws Exception {
        // Initialize the database
        topbarRepository.save(topbar);

        int databaseSizeBeforeUpdate = topbarRepository.findAll().size();

        // Update the topbar
        Topbar updatedTopbar = topbarRepository.findById(topbar.getId()).get();

        restTopbarMockMvc.perform(put("/api/topbars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTopbar)))
            .andExpect(status().isOk());

        // Validate the Topbar in the database
        List<Topbar> topbarList = topbarRepository.findAll();
        assertThat(topbarList).hasSize(databaseSizeBeforeUpdate);
        Topbar testTopbar = topbarList.get(topbarList.size() - 1);
    }

    @Test
    public void updateNonExistingTopbar() throws Exception {
        int databaseSizeBeforeUpdate = topbarRepository.findAll().size();

        // Create the Topbar

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTopbarMockMvc.perform(put("/api/topbars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(topbar)))
            .andExpect(status().isBadRequest());

        // Validate the Topbar in the database
        List<Topbar> topbarList = topbarRepository.findAll();
        assertThat(topbarList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteTopbar() throws Exception {
        // Initialize the database
        topbarRepository.save(topbar);

        int databaseSizeBeforeDelete = topbarRepository.findAll().size();

        // Delete the topbar
        restTopbarMockMvc.perform(delete("/api/topbars/{id}", topbar.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Topbar> topbarList = topbarRepository.findAll();
        assertThat(topbarList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
