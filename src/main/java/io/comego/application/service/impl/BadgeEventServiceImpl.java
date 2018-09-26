package io.comego.application.service.impl;

import io.comego.application.service.BadgeEventService;
import io.comego.application.domain.BadgeEvent;
import io.comego.application.repository.BadgeEventRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing BadgeEvent.
 */
@Service
@Transactional
public class BadgeEventServiceImpl implements BadgeEventService {

    private final Logger log = LoggerFactory.getLogger(BadgeEventServiceImpl.class);

    private final BadgeEventRepository badgeEventRepository;

    public BadgeEventServiceImpl(BadgeEventRepository badgeEventRepository) {
        this.badgeEventRepository = badgeEventRepository;
    }

    /**
     * Save a badgeEvent.
     *
     * @param badgeEvent the entity to save
     * @return the persisted entity
     */
    @Override
    public BadgeEvent save(BadgeEvent badgeEvent) {
        log.debug("Request to save BadgeEvent : {}", badgeEvent);        return badgeEventRepository.save(badgeEvent);
    }

    /**
     * Get all the badgeEvents.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<BadgeEvent> findAll() {
        log.debug("Request to get all BadgeEvents");
        return badgeEventRepository.findAll();
    }


    /**
     * Get one badgeEvent by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<BadgeEvent> findOne(Long id) {
        log.debug("Request to get BadgeEvent : {}", id);
        return badgeEventRepository.findById(id);
    }

    /**
     * Delete the badgeEvent by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete BadgeEvent : {}", id);
        badgeEventRepository.deleteById(id);
    }
}
