package io.comego.application.web.rest;

import io.comego.application.ComeGoApp;

import io.comego.application.domain.AdjustmentSchema;
import io.comego.application.repository.AdjustmentSchemaRepository;
import io.comego.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static io.comego.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AdjustmentSchemaResource REST controller.
 *
 * @see AdjustmentSchemaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ComeGoApp.class)
public class AdjustmentSchemaResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_KEY = "AAAAAAAAAA";
    private static final String UPDATED_KEY = "BBBBBBBBBB";

    private static final Instant DEFAULT_VALID_FROM = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_VALID_FROM = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    @Autowired
    private AdjustmentSchemaRepository adjustmentSchemaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAdjustmentSchemaMockMvc;

    private AdjustmentSchema adjustmentSchema;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AdjustmentSchemaResource adjustmentSchemaResource = new AdjustmentSchemaResource(adjustmentSchemaRepository);
        this.restAdjustmentSchemaMockMvc = MockMvcBuilders.standaloneSetup(adjustmentSchemaResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AdjustmentSchema createEntity(EntityManager em) {
        AdjustmentSchema adjustmentSchema = new AdjustmentSchema()
            .name(DEFAULT_NAME)
            .key(DEFAULT_KEY)
            .validFrom(DEFAULT_VALID_FROM)
            .active(DEFAULT_ACTIVE);
        return adjustmentSchema;
    }

    @Before
    public void initTest() {
        adjustmentSchema = createEntity(em);
    }

    @Test
    @Transactional
    public void createAdjustmentSchema() throws Exception {
        int databaseSizeBeforeCreate = adjustmentSchemaRepository.findAll().size();

        // Create the AdjustmentSchema
        restAdjustmentSchemaMockMvc.perform(post("/api/adjustment-schemas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(adjustmentSchema)))
            .andExpect(status().isCreated());

        // Validate the AdjustmentSchema in the database
        List<AdjustmentSchema> adjustmentSchemaList = adjustmentSchemaRepository.findAll();
        assertThat(adjustmentSchemaList).hasSize(databaseSizeBeforeCreate + 1);
        AdjustmentSchema testAdjustmentSchema = adjustmentSchemaList.get(adjustmentSchemaList.size() - 1);
        assertThat(testAdjustmentSchema.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testAdjustmentSchema.getKey()).isEqualTo(DEFAULT_KEY);
        assertThat(testAdjustmentSchema.getValidFrom()).isEqualTo(DEFAULT_VALID_FROM);
        assertThat(testAdjustmentSchema.isActive()).isEqualTo(DEFAULT_ACTIVE);
    }

    @Test
    @Transactional
    public void createAdjustmentSchemaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = adjustmentSchemaRepository.findAll().size();

        // Create the AdjustmentSchema with an existing ID
        adjustmentSchema.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAdjustmentSchemaMockMvc.perform(post("/api/adjustment-schemas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(adjustmentSchema)))
            .andExpect(status().isBadRequest());

        // Validate the AdjustmentSchema in the database
        List<AdjustmentSchema> adjustmentSchemaList = adjustmentSchemaRepository.findAll();
        assertThat(adjustmentSchemaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = adjustmentSchemaRepository.findAll().size();
        // set the field null
        adjustmentSchema.setName(null);

        // Create the AdjustmentSchema, which fails.

        restAdjustmentSchemaMockMvc.perform(post("/api/adjustment-schemas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(adjustmentSchema)))
            .andExpect(status().isBadRequest());

        List<AdjustmentSchema> adjustmentSchemaList = adjustmentSchemaRepository.findAll();
        assertThat(adjustmentSchemaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkKeyIsRequired() throws Exception {
        int databaseSizeBeforeTest = adjustmentSchemaRepository.findAll().size();
        // set the field null
        adjustmentSchema.setKey(null);

        // Create the AdjustmentSchema, which fails.

        restAdjustmentSchemaMockMvc.perform(post("/api/adjustment-schemas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(adjustmentSchema)))
            .andExpect(status().isBadRequest());

        List<AdjustmentSchema> adjustmentSchemaList = adjustmentSchemaRepository.findAll();
        assertThat(adjustmentSchemaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAdjustmentSchemas() throws Exception {
        // Initialize the database
        adjustmentSchemaRepository.saveAndFlush(adjustmentSchema);

        // Get all the adjustmentSchemaList
        restAdjustmentSchemaMockMvc.perform(get("/api/adjustment-schemas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(adjustmentSchema.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].key").value(hasItem(DEFAULT_KEY.toString())))
            .andExpect(jsonPath("$.[*].validFrom").value(hasItem(DEFAULT_VALID_FROM.toString())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getAdjustmentSchema() throws Exception {
        // Initialize the database
        adjustmentSchemaRepository.saveAndFlush(adjustmentSchema);

        // Get the adjustmentSchema
        restAdjustmentSchemaMockMvc.perform(get("/api/adjustment-schemas/{id}", adjustmentSchema.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(adjustmentSchema.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.key").value(DEFAULT_KEY.toString()))
            .andExpect(jsonPath("$.validFrom").value(DEFAULT_VALID_FROM.toString()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingAdjustmentSchema() throws Exception {
        // Get the adjustmentSchema
        restAdjustmentSchemaMockMvc.perform(get("/api/adjustment-schemas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAdjustmentSchema() throws Exception {
        // Initialize the database
        adjustmentSchemaRepository.saveAndFlush(adjustmentSchema);

        int databaseSizeBeforeUpdate = adjustmentSchemaRepository.findAll().size();

        // Update the adjustmentSchema
        AdjustmentSchema updatedAdjustmentSchema = adjustmentSchemaRepository.findById(adjustmentSchema.getId()).get();
        // Disconnect from session so that the updates on updatedAdjustmentSchema are not directly saved in db
        em.detach(updatedAdjustmentSchema);
        updatedAdjustmentSchema
            .name(UPDATED_NAME)
            .key(UPDATED_KEY)
            .validFrom(UPDATED_VALID_FROM)
            .active(UPDATED_ACTIVE);

        restAdjustmentSchemaMockMvc.perform(put("/api/adjustment-schemas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAdjustmentSchema)))
            .andExpect(status().isOk());

        // Validate the AdjustmentSchema in the database
        List<AdjustmentSchema> adjustmentSchemaList = adjustmentSchemaRepository.findAll();
        assertThat(adjustmentSchemaList).hasSize(databaseSizeBeforeUpdate);
        AdjustmentSchema testAdjustmentSchema = adjustmentSchemaList.get(adjustmentSchemaList.size() - 1);
        assertThat(testAdjustmentSchema.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testAdjustmentSchema.getKey()).isEqualTo(UPDATED_KEY);
        assertThat(testAdjustmentSchema.getValidFrom()).isEqualTo(UPDATED_VALID_FROM);
        assertThat(testAdjustmentSchema.isActive()).isEqualTo(UPDATED_ACTIVE);
    }

    @Test
    @Transactional
    public void updateNonExistingAdjustmentSchema() throws Exception {
        int databaseSizeBeforeUpdate = adjustmentSchemaRepository.findAll().size();

        // Create the AdjustmentSchema

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAdjustmentSchemaMockMvc.perform(put("/api/adjustment-schemas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(adjustmentSchema)))
            .andExpect(status().isBadRequest());

        // Validate the AdjustmentSchema in the database
        List<AdjustmentSchema> adjustmentSchemaList = adjustmentSchemaRepository.findAll();
        assertThat(adjustmentSchemaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAdjustmentSchema() throws Exception {
        // Initialize the database
        adjustmentSchemaRepository.saveAndFlush(adjustmentSchema);

        int databaseSizeBeforeDelete = adjustmentSchemaRepository.findAll().size();

        // Get the adjustmentSchema
        restAdjustmentSchemaMockMvc.perform(delete("/api/adjustment-schemas/{id}", adjustmentSchema.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AdjustmentSchema> adjustmentSchemaList = adjustmentSchemaRepository.findAll();
        assertThat(adjustmentSchemaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AdjustmentSchema.class);
        AdjustmentSchema adjustmentSchema1 = new AdjustmentSchema();
        adjustmentSchema1.setId(1L);
        AdjustmentSchema adjustmentSchema2 = new AdjustmentSchema();
        adjustmentSchema2.setId(adjustmentSchema1.getId());
        assertThat(adjustmentSchema1).isEqualTo(adjustmentSchema2);
        adjustmentSchema2.setId(2L);
        assertThat(adjustmentSchema1).isNotEqualTo(adjustmentSchema2);
        adjustmentSchema1.setId(null);
        assertThat(adjustmentSchema1).isNotEqualTo(adjustmentSchema2);
    }
}
