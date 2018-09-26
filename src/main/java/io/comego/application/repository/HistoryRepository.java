package io.comego.application.repository;

import io.comego.application.domain.History;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the History entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {

}
