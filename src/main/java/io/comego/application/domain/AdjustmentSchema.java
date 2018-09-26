package io.comego.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A AdjustmentSchema.
 */
@Entity
@Table(name = "adjustment_schema")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AdjustmentSchema implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 100)
    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @NotNull
    @Size(max = 36)
    @Column(name = "jhi_key", length = 36, nullable = false)
    private String key;

    @Column(name = "valid_from")
    private Instant validFrom;

    @Column(name = "active")
    private Boolean active;

    @OneToOne(mappedBy = "adjustmentSchema")
    @JsonIgnore
    private Person person;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public AdjustmentSchema name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getKey() {
        return key;
    }

    public AdjustmentSchema key(String key) {
        this.key = key;
        return this;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public Instant getValidFrom() {
        return validFrom;
    }

    public AdjustmentSchema validFrom(Instant validFrom) {
        this.validFrom = validFrom;
        return this;
    }

    public void setValidFrom(Instant validFrom) {
        this.validFrom = validFrom;
    }

    public Boolean isActive() {
        return active;
    }

    public AdjustmentSchema active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Person getPerson() {
        return person;
    }

    public AdjustmentSchema person(Person person) {
        this.person = person;
        return this;
    }

    public void setPerson(Person person) {
        this.person = person;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        AdjustmentSchema adjustmentSchema = (AdjustmentSchema) o;
        if (adjustmentSchema.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), adjustmentSchema.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AdjustmentSchema{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", key='" + getKey() + "'" +
            ", validFrom='" + getValidFrom() + "'" +
            ", active='" + isActive() + "'" +
            "}";
    }
}
