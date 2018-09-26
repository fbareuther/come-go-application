package io.comego.application.web.rest;

import io.comego.application.ComeGoApp;

import io.comego.application.domain.History;
import io.comego.application.repository.HistoryRepository;
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
import java.time.LocalDate;
import java.time.Instant;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static io.comego.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the HistoryResource REST controller.
 *
 * @see HistoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ComeGoApp.class)
public class HistoryResourceIntTest {

    private static final LocalDate DEFAULT_ACTUAL_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_ACTUAL_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Instant DEFAULT_START_EVENT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_EVENT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_EVENT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_EVENT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Float DEFAULT_GROSS_HOURS = 1F;
    private static final Float UPDATED_GROSS_HOURS = 2F;

    private static final Float DEFAULT_DEDUCTION_HOURS = 1F;
    private static final Float UPDATED_DEDUCTION_HOURS = 2F;

    private static final Float DEFAULT_ADDITION_HOURS = 1F;
    private static final Float UPDATED_ADDITION_HOURS = 2F;

    private static final Float DEFAULT_NET_HOURS = 1F;
    private static final Float UPDATED_NET_HOURS = 2F;

    @Autowired
    private HistoryRepository historyRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restHistoryMockMvc;

    private History history;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HistoryResource historyResource = new HistoryResource(historyRepository);
        this.restHistoryMockMvc = MockMvcBuilders.standaloneSetup(historyResource)
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
    public static History createEntity(EntityManager em) {
        History history = new History()
            .actualDate(DEFAULT_ACTUAL_DATE)
            .startEvent(DEFAULT_START_EVENT)
            .endEvent(DEFAULT_END_EVENT)
            .grossHours(DEFAULT_GROSS_HOURS)
            .deductionHours(DEFAULT_DEDUCTION_HOURS)
            .additionHours(DEFAULT_ADDITION_HOURS)
            .netHours(DEFAULT_NET_HOURS);
        return history;
    }

    @Before
    public void initTest() {
        history = createEntity(em);
    }

    @Test
    @Transactional
    public void createHistory() throws Exception {
        int databaseSizeBeforeCreate = historyRepository.findAll().size();

        // Create the History
        restHistoryMockMvc.perform(post("/api/histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(history)))
            .andExpect(status().isCreated());

        // Validate the History in the database
        List<History> historyList = historyRepository.findAll();
        assertThat(historyList).hasSize(databaseSizeBeforeCreate + 1);
        History testHistory = historyList.get(historyList.size() - 1);
        assertThat(testHistory.getActualDate()).isEqualTo(DEFAULT_ACTUAL_DATE);
        assertThat(testHistory.getStartEvent()).isEqualTo(DEFAULT_START_EVENT);
        assertThat(testHistory.getEndEvent()).isEqualTo(DEFAULT_END_EVENT);
        assertThat(testHistory.getGrossHours()).isEqualTo(DEFAULT_GROSS_HOURS);
        assertThat(testHistory.getDeductionHours()).isEqualTo(DEFAULT_DEDUCTION_HOURS);
        assertThat(testHistory.getAdditionHours()).isEqualTo(DEFAULT_ADDITION_HOURS);
        assertThat(testHistory.getNetHours()).isEqualTo(DEFAULT_NET_HOURS);
    }

    @Test
    @Transactional
    public void createHistoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = historyRepository.findAll().size();

        // Create the History with an existing ID
        history.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHistoryMockMvc.perform(post("/api/histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(history)))
            .andExpect(status().isBadRequest());

        // Validate the History in the database
        List<History> historyList = historyRepository.findAll();
        assertThat(historyList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllHistories() throws Exception {
        // Initialize the database
        historyRepository.saveAndFlush(history);

        // Get all the historyList
        restHistoryMockMvc.perform(get("/api/histories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(history.getId().intValue())))
            .andExpect(jsonPath("$.[*].actualDate").value(hasItem(DEFAULT_ACTUAL_DATE.toString())))
            .andExpect(jsonPath("$.[*].startEvent").value(hasItem(DEFAULT_START_EVENT.toString())))
            .andExpect(jsonPath("$.[*].endEvent").value(hasItem(DEFAULT_END_EVENT.toString())))
            .andExpect(jsonPath("$.[*].grossHours").value(hasItem(DEFAULT_GROSS_HOURS.doubleValue())))
            .andExpect(jsonPath("$.[*].deductionHours").value(hasItem(DEFAULT_DEDUCTION_HOURS.doubleValue())))
            .andExpect(jsonPath("$.[*].additionHours").value(hasItem(DEFAULT_ADDITION_HOURS.doubleValue())))
            .andExpect(jsonPath("$.[*].netHours").value(hasItem(DEFAULT_NET_HOURS.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getHistory() throws Exception {
        // Initialize the database
        historyRepository.saveAndFlush(history);

        // Get the history
        restHistoryMockMvc.perform(get("/api/histories/{id}", history.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(history.getId().intValue()))
            .andExpect(jsonPath("$.actualDate").value(DEFAULT_ACTUAL_DATE.toString()))
            .andExpect(jsonPath("$.startEvent").value(DEFAULT_START_EVENT.toString()))
            .andExpect(jsonPath("$.endEvent").value(DEFAULT_END_EVENT.toString()))
            .andExpect(jsonPath("$.grossHours").value(DEFAULT_GROSS_HOURS.doubleValue()))
            .andExpect(jsonPath("$.deductionHours").value(DEFAULT_DEDUCTION_HOURS.doubleValue()))
            .andExpect(jsonPath("$.additionHours").value(DEFAULT_ADDITION_HOURS.doubleValue()))
            .andExpect(jsonPath("$.netHours").value(DEFAULT_NET_HOURS.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingHistory() throws Exception {
        // Get the history
        restHistoryMockMvc.perform(get("/api/histories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHistory() throws Exception {
        // Initialize the database
        historyRepository.saveAndFlush(history);

        int databaseSizeBeforeUpdate = historyRepository.findAll().size();

        // Update the history
        History updatedHistory = historyRepository.findById(history.getId()).get();
        // Disconnect from session so that the updates on updatedHistory are not directly saved in db
        em.detach(updatedHistory);
        updatedHistory
            .actualDate(UPDATED_ACTUAL_DATE)
            .startEvent(UPDATED_START_EVENT)
            .endEvent(UPDATED_END_EVENT)
            .grossHours(UPDATED_GROSS_HOURS)
            .deductionHours(UPDATED_DEDUCTION_HOURS)
            .additionHours(UPDATED_ADDITION_HOURS)
            .netHours(UPDATED_NET_HOURS);

        restHistoryMockMvc.perform(put("/api/histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedHistory)))
            .andExpect(status().isOk());

        // Validate the History in the database
        List<History> historyList = historyRepository.findAll();
        assertThat(historyList).hasSize(databaseSizeBeforeUpdate);
        History testHistory = historyList.get(historyList.size() - 1);
        assertThat(testHistory.getActualDate()).isEqualTo(UPDATED_ACTUAL_DATE);
        assertThat(testHistory.getStartEvent()).isEqualTo(UPDATED_START_EVENT);
        assertThat(testHistory.getEndEvent()).isEqualTo(UPDATED_END_EVENT);
        assertThat(testHistory.getGrossHours()).isEqualTo(UPDATED_GROSS_HOURS);
        assertThat(testHistory.getDeductionHours()).isEqualTo(UPDATED_DEDUCTION_HOURS);
        assertThat(testHistory.getAdditionHours()).isEqualTo(UPDATED_ADDITION_HOURS);
        assertThat(testHistory.getNetHours()).isEqualTo(UPDATED_NET_HOURS);
    }

    @Test
    @Transactional
    public void updateNonExistingHistory() throws Exception {
        int databaseSizeBeforeUpdate = historyRepository.findAll().size();

        // Create the History

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHistoryMockMvc.perform(put("/api/histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(history)))
            .andExpect(status().isBadRequest());

        // Validate the History in the database
        List<History> historyList = historyRepository.findAll();
        assertThat(historyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteHistory() throws Exception {
        // Initialize the database
        historyRepository.saveAndFlush(history);

        int databaseSizeBeforeDelete = historyRepository.findAll().size();

        // Get the history
        restHistoryMockMvc.perform(delete("/api/histories/{id}", history.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<History> historyList = historyRepository.findAll();
        assertThat(historyList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(History.class);
        History history1 = new History();
        history1.setId(1L);
        History history2 = new History();
        history2.setId(history1.getId());
        assertThat(history1).isEqualTo(history2);
        history2.setId(2L);
        assertThat(history1).isNotEqualTo(history2);
        history1.setId(null);
        assertThat(history1).isNotEqualTo(history2);
    }
}
