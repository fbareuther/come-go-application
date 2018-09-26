package io.comego.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.comego.application.domain.BadgeEvent;
import io.comego.application.service.BadgeEventService;
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
 * REST controller for managing BadgeEvent.
 */
@RestController
@RequestMapping("/api")
public class BadgeEventResource {

    private final Logger log = LoggerFactory.getLogger(BadgeEventResource.class);

    private static final String ENTITY_NAME = "badgeEvent";

    private final BadgeEventService badgeEventService;

    public BadgeEventResource(BadgeEventService badgeEventService) {
        this.badgeEventService = badgeEventService;
    }

    /**
     * POST  /badge-events : Create a new badgeEvent.
     *
     * @param badgeEvent the badgeEvent to create
     * @return the ResponseEntity with status 201 (Created) and with body the new badgeEvent, or with status 400 (Bad Request) if the badgeEvent has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/badge-events")
    @Timed
    public ResponseEntity<BadgeEvent> createBadgeEvent(@RequestBody BadgeEvent badgeEvent) throws URISyntaxException {
        log.debug("REST request to save BadgeEvent : {}", badgeEvent);
        if (badgeEvent.getId() != null) {
            throw new BadRequestAlertException("A new badgeEvent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BadgeEvent result = badgeEventService.save(badgeEvent);
        return ResponseEntity.created(new URI("/api/badge-events/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /badge-events : Updates an existing badgeEvent.
     *
     * @param badgeEvent the badgeEvent to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated badgeEvent,
     * or with status 400 (Bad Request) if the badgeEvent is not valid,
     * or with status 500 (Internal Server Error) if the badgeEvent couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/badge-events")
    @Timed
    public ResponseEntity<BadgeEvent> updateBadgeEvent(@RequestBody BadgeEvent badgeEvent) throws URISyntaxException {
        log.debug("REST request to update BadgeEvent : {}", badgeEvent);
        if (badgeEvent.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BadgeEvent result = badgeEventService.save(badgeEvent);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, badgeEvent.getId().toString()))
            .body(result);
    }

    /**
     * GET  /badge-events : get all the badgeEvents.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of badgeEvents in body
     */
    @GetMapping("/badge-events")
    @Timed
    public List<BadgeEvent> getAllBadgeEvents() {
        log.debug("REST request to get all BadgeEvents");
        return badgeEventService.findAll();
    }

    /**
     * GET  /badge-events/:id : get the "id" badgeEvent.
     *
     * @param id the id of the badgeEvent to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the badgeEvent, or with status 404 (Not Found)
     */
    @GetMapping("/badge-events/{id}")
    @Timed
    public ResponseEntity<BadgeEvent> getBadgeEvent(@PathVariable Long id) {
        log.debug("REST request to get BadgeEvent : {}", id);
        Optional<BadgeEvent> badgeEvent = badgeEventService.findOne(id);
        return ResponseUtil.wrapOrNotFound(badgeEvent);
    }

    /**
     * DELETE  /badge-events/:id : delete the "id" badgeEvent.
     *
     * @param id the id of the badgeEvent to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/badge-events/{id}")
    @Timed
    public ResponseEntity<Void> deleteBadgeEvent(@PathVariable Long id) {
        log.debug("REST request to delete BadgeEvent : {}", id);
        badgeEventService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
