package io.comego.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A BadgeEvent.
 */
@Entity
@Table(name = "badge_event")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class BadgeEvent implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "occurance")
    private Instant occurance;

    @ManyToOne
    @JsonIgnoreProperties("badgeEvents")
    private Badge badge;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getOccurance() {
        return occurance;
    }

    public BadgeEvent occurance(Instant occurance) {
        this.occurance = occurance;
        return this;
    }

    public void setOccurance(Instant occurance) {
        this.occurance = occurance;
    }

    public Badge getBadge() {
        return badge;
    }

    public BadgeEvent badge(Badge badge) {
        this.badge = badge;
        return this;
    }

    public void setBadge(Badge badge) {
        this.badge = badge;
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
        BadgeEvent badgeEvent = (BadgeEvent) o;
        if (badgeEvent.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), badgeEvent.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BadgeEvent{" +
            "id=" + getId() +
            ", occurance='" + getOccurance() + "'" +
            "}";
    }
}
