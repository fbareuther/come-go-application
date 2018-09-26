package io.comego.application.repository;

import io.comego.application.domain.AdjustmentSchema;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AdjustmentSchema entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AdjustmentSchemaRepository extends JpaRepository<AdjustmentSchema, Long> {

}
