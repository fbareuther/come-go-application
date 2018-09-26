package io.comego.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.comego.application.domain.History;
import io.comego.application.repository.HistoryRepository;
import io.comego.application.web.rest.errors.BadRequestAlertException;
import io.comego.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing History.
 */
@RestController
@RequestMapping("/api")
public class HistoryResource {

    private final Logger log = LoggerFactory.getLogger(HistoryResource.class);

    private static final String ENTITY_NAME = "history";

    private final HistoryRepository historyRepository;

    public HistoryResource(HistoryRepository historyRepository) {
        this.historyRepository = historyRepository;
    }

    /**
     * POST  /histories : Create a new history.
     *
     * @param history the history to create
     * @return the ResponseEntity with status 201 (Created) and with body the new history, or with status 400 (Bad Request) if the history has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/histories")
    @Timed
    public ResponseEntity<History> createHistory(@RequestBody History history) throws URISyntaxException {
        log.debug("REST request to save History : {}", history);
        if (history.getId() != null) {
            throw new BadRequestAlertException("A new history cannot already have an ID", ENTITY_NAME, "idexists");
        }
        History result = historyRepository.save(history);
        return ResponseEntity.created(new URI("/api/histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /histories : Updates an existing history.
     *
     * @param history the history to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated history,
     * or with status 400 (Bad Request) if the history is not valid,
     * or with status 500 (Internal Server Error) if the history couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/histories")
    @Timed
    public ResponseEntity<History> updateHistory(@RequestBody History history) throws URISyntaxException {
        log.debug("REST request to update History : {}", history);
        if (history.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        History result = historyRepository.save(history);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, history.getId().toString()))
            .body(result);
    }

    /**
     * GET  /histories : get all the histories.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of histories in body
     */
    @GetMapping("/histories")
    @Timed
    public List<History> getAllHistories() {
        log.debug("REST request to get all Histories");
        return historyRepository.findAll();
    }

    /**
     * GET  /histories/:id : get the "id" history.
     *
     * @param id the id of the history to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the history, or with status 404 (Not Found)
     */
    @GetMapping("/histories/{id}")
    @Timed
    public ResponseEntity<History> getHistory(@PathVariable Long id) {
        log.debug("REST request to get History : {}", id);
        Optional<History> history = historyRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(history);
    }

    /**
     * DELETE  /histories/:id : delete the "id" history.
     *
     * @param id the id of the history to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/histories/{id}")
    @Timed
    public ResponseEntity<Void> deleteHistory(@PathVariable Long id) {
        log.debug("REST request to delete History : {}", id);

        historyRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
