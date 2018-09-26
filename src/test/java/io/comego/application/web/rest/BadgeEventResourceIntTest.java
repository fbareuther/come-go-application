package io.comego.application.web.rest;

import io.comego.application.ComeGoApp;

import io.comego.application.domain.BadgeEvent;
import io.comego.application.repository.BadgeEventRepository;
import io.comego.application.service.BadgeEventService;
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
 * Test class for the BadgeEventResource REST controller.
 *
 * @see BadgeEventResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ComeGoApp.class)
public class BadgeEventResourceIntTest {

    private static final Instant DEFAULT_OCCURANCE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_OCCURANCE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private BadgeEventRepository badgeEventRepository;
    
    @Autowired
    private BadgeEventService badgeEventService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBadgeEventMockMvc;

    private BadgeEvent badgeEvent;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BadgeEventResource badgeEventResource = new BadgeEventResource(badgeEventService);
        this.restBadgeEventMockMvc = MockMvcBuilders.standaloneSetup(badgeEventResource)
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
    public static BadgeEvent createEntity(EntityManager em) {
        BadgeEvent badgeEvent = new BadgeEvent()
            .occurance(DEFAULT_OCCURANCE);
        return badgeEvent;
    }

    @Before
    public void initTest() {
        badgeEvent = createEntity(em);
    }

    @Test
    @Transactional
    public void createBadgeEvent() throws Exception {
        int databaseSizeBeforeCreate = badgeEventRepository.findAll().size();

        // Create the BadgeEvent
        restBadgeEventMockMvc.perform(post("/api/badge-events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(badgeEvent)))
            .andExpect(status().isCreated());

        // Validate the BadgeEvent in the database
        List<BadgeEvent> badgeEventList = badgeEventRepository.findAll();
        assertThat(badgeEventList).hasSize(databaseSizeBeforeCreate + 1);
        BadgeEvent testBadgeEvent = badgeEventList.get(badgeEventList.size() - 1);
        assertThat(testBadgeEvent.getOccurance()).isEqualTo(DEFAULT_OCCURANCE);
    }

    @Test
    @Transactional
    public void createBadgeEventWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = badgeEventRepository.findAll().size();

        // Create the BadgeEvent with an existing ID
        badgeEvent.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBadgeEventMockMvc.perform(post("/api/badge-events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(badgeEvent)))
            .andExpect(status().isBadRequest());

        // Validate the BadgeEvent in the database
        List<BadgeEvent> badgeEventList = badgeEventRepository.findAll();
        assertThat(badgeEventList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBadgeEvents() throws Exception {
        // Initialize the database
        badgeEventRepository.saveAndFlush(badgeEvent);

        // Get all the badgeEventList
        restBadgeEventMockMvc.perform(get("/api/badge-events?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(badgeEvent.getId().intValue())))
            .andExpect(jsonPath("$.[*].occurance").value(hasItem(DEFAULT_OCCURANCE.toString())));
    }
    
    @Test
    @Transactional
    public void getBadgeEvent() throws Exception {
        // Initialize the database
        badgeEventRepository.saveAndFlush(badgeEvent);

        // Get the badgeEvent
        restBadgeEventMockMvc.perform(get("/api/badge-events/{id}", badgeEvent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(badgeEvent.getId().intValue()))
            .andExpect(jsonPath("$.occurance").value(DEFAULT_OCCURANCE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBadgeEvent() throws Exception {
        // Get the badgeEvent
        restBadgeEventMockMvc.perform(get("/api/badge-events/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBadgeEvent() throws Exception {
        // Initialize the database
        badgeEventService.save(badgeEvent);

        int databaseSizeBeforeUpdate = badgeEventRepository.findAll().size();

        // Update the badgeEvent
        BadgeEvent updatedBadgeEvent = badgeEventRepository.findById(badgeEvent.getId()).get();
        // Disconnect from session so that the updates on updatedBadgeEvent are not directly saved in db
        em.detach(updatedBadgeEvent);
        updatedBadgeEvent
            .occurance(UPDATED_OCCURANCE);

        restBadgeEventMockMvc.perform(put("/api/badge-events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBadgeEvent)))
            .andExpect(status().isOk());

        // Validate the BadgeEvent in the database
        List<BadgeEvent> badgeEventList = badgeEventRepository.findAll();
        assertThat(badgeEventList).hasSize(databaseSizeBeforeUpdate);
        BadgeEvent testBadgeEvent = badgeEventList.get(badgeEventList.size() - 1);
        assertThat(testBadgeEvent.getOccurance()).isEqualTo(UPDATED_OCCURANCE);
    }

    @Test
    @Transactional
    public void updateNonExistingBadgeEvent() throws Exception {
        int databaseSizeBeforeUpdate = badgeEventRepository.findAll().size();

        // Create the BadgeEvent

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBadgeEventMockMvc.perform(put("/api/badge-events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(badgeEvent)))
            .andExpect(status().isBadRequest());

        // Validate the BadgeEvent in the database
        List<BadgeEvent> badgeEventList = badgeEventRepository.findAll();
        assertThat(badgeEventList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBadgeEvent() throws Exception {
        // Initialize the database
        badgeEventService.save(badgeEvent);

        int databaseSizeBeforeDelete = badgeEventRepository.findAll().size();

        // Get the badgeEvent
        restBadgeEventMockMvc.perform(delete("/api/badge-events/{id}", badgeEvent.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<BadgeEvent> badgeEventList = badgeEventRepository.findAll();
        assertThat(badgeEventList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BadgeEvent.class);
        BadgeEvent badgeEvent1 = new BadgeEvent();
        badgeEvent1.setId(1L);
        BadgeEvent badgeEvent2 = new BadgeEvent();
        badgeEvent2.setId(badgeEvent1.getId());
        assertThat(badgeEvent1).isEqualTo(badgeEvent2);
        badgeEvent2.setId(2L);
        assertThat(badgeEvent1).isNotEqualTo(badgeEvent2);
        badgeEvent1.setId(null);
        assertThat(badgeEvent1).isNotEqualTo(badgeEvent2);
    }
}
