package io.comego.application.web.rest;

import io.comego.application.ComeGoApp;

import io.comego.application.domain.Badge;
import io.comego.application.repository.BadgeRepository;
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
import java.util.List;


import static io.comego.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import io.comego.application.domain.enumeration.IdentificationType;
/**
 * Test class for the BadgeResource REST controller.
 *
 * @see BadgeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ComeGoApp.class)
public class BadgeResourceIntTest {

    private static final String DEFAULT_TAG = "AAAAAAAAAA";
    private static final String UPDATED_TAG = "BBBBBBBBBB";

    private static final IdentificationType DEFAULT_TYPE = IdentificationType.APP;
    private static final IdentificationType UPDATED_TYPE = IdentificationType.URL;

    @Autowired
    private BadgeRepository badgeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBadgeMockMvc;

    private Badge badge;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BadgeResource badgeResource = new BadgeResource(badgeRepository);
        this.restBadgeMockMvc = MockMvcBuilders.standaloneSetup(badgeResource)
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
    public static Badge createEntity(EntityManager em) {
        Badge badge = new Badge()
            .tag(DEFAULT_TAG)
            .type(DEFAULT_TYPE);
        return badge;
    }

    @Before
    public void initTest() {
        badge = createEntity(em);
    }

    @Test
    @Transactional
    public void createBadge() throws Exception {
        int databaseSizeBeforeCreate = badgeRepository.findAll().size();

        // Create the Badge
        restBadgeMockMvc.perform(post("/api/badges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(badge)))
            .andExpect(status().isCreated());

        // Validate the Badge in the database
        List<Badge> badgeList = badgeRepository.findAll();
        assertThat(badgeList).hasSize(databaseSizeBeforeCreate + 1);
        Badge testBadge = badgeList.get(badgeList.size() - 1);
        assertThat(testBadge.getTag()).isEqualTo(DEFAULT_TAG);
        assertThat(testBadge.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    public void createBadgeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = badgeRepository.findAll().size();

        // Create the Badge with an existing ID
        badge.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBadgeMockMvc.perform(post("/api/badges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(badge)))
            .andExpect(status().isBadRequest());

        // Validate the Badge in the database
        List<Badge> badgeList = badgeRepository.findAll();
        assertThat(badgeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTagIsRequired() throws Exception {
        int databaseSizeBeforeTest = badgeRepository.findAll().size();
        // set the field null
        badge.setTag(null);

        // Create the Badge, which fails.

        restBadgeMockMvc.perform(post("/api/badges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(badge)))
            .andExpect(status().isBadRequest());

        List<Badge> badgeList = badgeRepository.findAll();
        assertThat(badgeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBadges() throws Exception {
        // Initialize the database
        badgeRepository.saveAndFlush(badge);

        // Get all the badgeList
        restBadgeMockMvc.perform(get("/api/badges?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(badge.getId().intValue())))
            .andExpect(jsonPath("$.[*].tag").value(hasItem(DEFAULT_TAG.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }
    
    @Test
    @Transactional
    public void getBadge() throws Exception {
        // Initialize the database
        badgeRepository.saveAndFlush(badge);

        // Get the badge
        restBadgeMockMvc.perform(get("/api/badges/{id}", badge.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(badge.getId().intValue()))
            .andExpect(jsonPath("$.tag").value(DEFAULT_TAG.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBadge() throws Exception {
        // Get the badge
        restBadgeMockMvc.perform(get("/api/badges/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBadge() throws Exception {
        // Initialize the database
        badgeRepository.saveAndFlush(badge);

        int databaseSizeBeforeUpdate = badgeRepository.findAll().size();

        // Update the badge
        Badge updatedBadge = badgeRepository.findById(badge.getId()).get();
        // Disconnect from session so that the updates on updatedBadge are not directly saved in db
        em.detach(updatedBadge);
        updatedBadge
            .tag(UPDATED_TAG)
            .type(UPDATED_TYPE);

        restBadgeMockMvc.perform(put("/api/badges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBadge)))
            .andExpect(status().isOk());

        // Validate the Badge in the database
        List<Badge> badgeList = badgeRepository.findAll();
        assertThat(badgeList).hasSize(databaseSizeBeforeUpdate);
        Badge testBadge = badgeList.get(badgeList.size() - 1);
        assertThat(testBadge.getTag()).isEqualTo(UPDATED_TAG);
        assertThat(testBadge.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingBadge() throws Exception {
        int databaseSizeBeforeUpdate = badgeRepository.findAll().size();

        // Create the Badge

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBadgeMockMvc.perform(put("/api/badges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(badge)))
            .andExpect(status().isBadRequest());

        // Validate the Badge in the database
        List<Badge> badgeList = badgeRepository.findAll();
        assertThat(badgeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBadge() throws Exception {
        // Initialize the database
        badgeRepository.saveAndFlush(badge);

        int databaseSizeBeforeDelete = badgeRepository.findAll().size();

        // Get the badge
        restBadgeMockMvc.perform(delete("/api/badges/{id}", badge.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Badge> badgeList = badgeRepository.findAll();
        assertThat(badgeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Badge.class);
        Badge badge1 = new Badge();
        badge1.setId(1L);
        Badge badge2 = new Badge();
        badge2.setId(badge1.getId());
        assertThat(badge1).isEqualTo(badge2);
        badge2.setId(2L);
        assertThat(badge1).isNotEqualTo(badge2);
        badge1.setId(null);
        assertThat(badge1).isNotEqualTo(badge2);
    }
}
