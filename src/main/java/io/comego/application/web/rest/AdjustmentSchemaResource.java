package io.comego.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.comego.application.domain.AdjustmentSchema;
import io.comego.application.repository.AdjustmentSchemaRepository;
import io.comego.application.web.rest.errors.BadRequestAlertException;
import io.comego.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing AdjustmentSchema.
 */
@RestController
@RequestMapping("/api")
public class AdjustmentSchemaResource {

    private final Logger log = LoggerFactory.getLogger(AdjustmentSchemaResource.class);

    private static final String ENTITY_NAME = "adjustmentSchema";

    private final AdjustmentSchemaRepository adjustmentSchemaRepository;

    public AdjustmentSchemaResource(AdjustmentSchemaRepository adjustmentSchemaRepository) {
        this.adjustmentSchemaRepository = adjustmentSchemaRepository;
    }

    /**
     * POST  /adjustment-schemas : Create a new adjustmentSchema.
     *
     * @param adjustmentSchema the adjustmentSchema to create
     * @return the ResponseEntity with status 201 (Created) and with body the new adjustmentSchema, or with status 400 (Bad Request) if the adjustmentSchema has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/adjustment-schemas")
    @Timed
    public ResponseEntity<AdjustmentSchema> createAdjustmentSchema(@Valid @RequestBody AdjustmentSchema adjustmentSchema) throws URISyntaxException {
        log.debug("REST request to save AdjustmentSchema : {}", adjustmentSchema);
        if (adjustmentSchema.getId() != null) {
            throw new BadRequestAlertException("A new adjustmentSchema cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AdjustmentSchema result = adjustmentSchemaRepository.save(adjustmentSchema);
        return ResponseEntity.created(new URI("/api/adjustment-schemas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /adjustment-schemas : Updates an existing adjustmentSchema.
     *
     * @param adjustmentSchema the adjustmentSchema to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated adjustmentSchema,
     * or with status 400 (Bad Request) if the adjustmentSchema is not valid,
     * or with status 500 (Internal Server Error) if the adjustmentSchema couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/adjustment-schemas")
    @Timed
    public ResponseEntity<AdjustmentSchema> updateAdjustmentSchema(@Valid @RequestBody AdjustmentSchema adjustmentSchema) throws URISyntaxException {
        log.debug("REST request to update AdjustmentSchema : {}", adjustmentSchema);
        if (adjustmentSchema.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AdjustmentSchema result = adjustmentSchemaRepository.save(adjustmentSchema);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, adjustmentSchema.getId().toString()))
            .body(result);
    }

    /**
     * GET  /adjustment-schemas : get all the adjustmentSchemas.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of adjustmentSchemas in body
     */
    @GetMapping("/adjustment-schemas")
    @Timed
    public List<AdjustmentSchema> getAllAdjustmentSchemas(@RequestParam(required = false) String filter) {
        if ("person-is-null".equals(filter)) {
            log.debug("REST request to get all AdjustmentSchemas where person is null");
            return StreamSupport
                .stream(adjustmentSchemaRepository.findAll().spliterator(), false)
                .filter(adjustmentSchema -> adjustmentSchema.getPerson() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all AdjustmentSchemas");
        return adjustmentSchemaRepository.findAll();
    }

    /**
     * GET  /adjustment-schemas/:id : get the "id" adjustmentSchema.
     *
     * @param id the id of the adjustmentSchema to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the adjustmentSchema, or with status 404 (Not Found)
     */
    @GetMapping("/adjustment-schemas/{id}")
    @Timed
    public ResponseEntity<AdjustmentSchema> getAdjustmentSchema(@PathVariable Long id) {
        log.debug("REST request to get AdjustmentSchema : {}", id);
        Optional<AdjustmentSchema> adjustmentSchema = adjustmentSchemaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(adjustmentSchema);
    }

    /**
     * DELETE  /adjustment-schemas/:id : delete the "id" adjustmentSchema.
     *
     * @param id the id of the adjustmentSchema to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/adjustment-schemas/{id}")
    @Timed
    public ResponseEntity<Void> deleteAdjustmentSchema(@PathVariable Long id) {
        log.debug("REST request to delete AdjustmentSchema : {}", id);

        adjustmentSchemaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
