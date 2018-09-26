package io.comego.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import io.comego.application.domain.enumeration.IdentificationType;

/**
 * A Badge.
 */
@Entity
@Table(name = "badge")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Badge implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 36)
    @Column(name = "tag", length = 36, nullable = false)
    private String tag;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private IdentificationType type;

    @OneToMany(mappedBy = "badge")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<BadgeEvent> badgeEvents = new HashSet<>();

    @OneToOne(mappedBy = "badge")
    @JsonIgnore
    private History history;

    @ManyToOne
    @JsonIgnoreProperties("badges")
    private Person person;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTag() {
        return tag;
    }

    public Badge tag(String tag) {
        this.tag = tag;
        return this;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public IdentificationType getType() {
        return type;
    }

    public Badge type(IdentificationType type) {
        this.type = type;
        return this;
    }

    public void setType(IdentificationType type) {
        this.type = type;
    }

    public Set<BadgeEvent> getBadgeEvents() {
        return badgeEvents;
    }

    public Badge badgeEvents(Set<BadgeEvent> badgeEvents) {
        this.badgeEvents = badgeEvents;
        return this;
    }

    public Badge addBadgeEvent(BadgeEvent badgeEvent) {
        this.badgeEvents.add(badgeEvent);
        badgeEvent.setBadge(this);
        return this;
    }

    public Badge removeBadgeEvent(BadgeEvent badgeEvent) {
        this.badgeEvents.remove(badgeEvent);
        badgeEvent.setBadge(null);
        return this;
    }

    public void setBadgeEvents(Set<BadgeEvent> badgeEvents) {
        this.badgeEvents = badgeEvents;
    }

    public History getHistory() {
        return history;
    }

    public Badge history(History history) {
        this.history = history;
        return this;
    }

    public void setHistory(History history) {
        this.history = history;
    }

    public Person getPerson() {
        return person;
    }

    public Badge person(Person person) {
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
        Badge badge = (Badge) o;
        if (badge.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), badge.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Badge{" +
            "id=" + getId() +
            ", tag='" + getTag() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
