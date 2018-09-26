package io.comego.application.service;

import io.comego.application.domain.BadgeEvent;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing BadgeEvent.
 */
public interface BadgeEventService {

    /**
     * Save a badgeEvent.
     *
     * @param badgeEvent the entity to save
     * @return the persisted entity
     */
    BadgeEvent save(BadgeEvent badgeEvent);

    /**
     * Get all the badgeEvents.
     *
     * @return the list of entities
     */
    List<BadgeEvent> findAll();


    /**
     * Get the "id" badgeEvent.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<BadgeEvent> findOne(Long id);

    /**
     * Delete the "id" badgeEvent.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
