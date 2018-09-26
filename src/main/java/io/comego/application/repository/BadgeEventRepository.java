package io.comego.application.repository;

import io.comego.application.domain.BadgeEvent;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the BadgeEvent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BadgeEventRepository extends JpaRepository<BadgeEvent, Long> {

}
