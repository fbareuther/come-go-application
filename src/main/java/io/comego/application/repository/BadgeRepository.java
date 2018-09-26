package io.comego.application.repository;

import io.comego.application.domain.Badge;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Badge entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BadgeRepository extends JpaRepository<Badge, Long> {

}
