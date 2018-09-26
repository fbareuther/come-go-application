package io.comego.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Person.
 */
@Entity
@Table(name = "person")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Person implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 100)
    @Column(name = "user_name", length = 100, nullable = false)
    private String userName;

    @NotNull
    @Column(name = "email", nullable = false)
    private String email;

    @OneToOne
    @JoinColumn(unique = true)
    private AdjustmentSchema adjustmentSchema;

    @OneToMany(mappedBy = "person")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Badge> badges = new HashSet<>();

    @OneToMany(mappedBy = "person")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<History> histories = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public Person userName(String userName) {
        this.userName = userName;
        return this;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public Person email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public AdjustmentSchema getAdjustmentSchema() {
        return adjustmentSchema;
    }

    public Person adjustmentSchema(AdjustmentSchema adjustmentSchema) {
        this.adjustmentSchema = adjustmentSchema;
        return this;
    }

    public void setAdjustmentSchema(AdjustmentSchema adjustmentSchema) {
        this.adjustmentSchema = adjustmentSchema;
    }

    public Set<Badge> getBadges() {
        return badges;
    }

    public Person badges(Set<Badge> badges) {
        this.badges = badges;
        return this;
    }

    public Person addBadge(Badge badge) {
        this.badges.add(badge);
        badge.setPerson(this);
        return this;
    }

    public Person removeBadge(Badge badge) {
        this.badges.remove(badge);
        badge.setPerson(null);
        return this;
    }

    public void setBadges(Set<Badge> badges) {
        this.badges = badges;
    }

    public Set<History> getHistories() {
        return histories;
    }

    public Person histories(Set<History> histories) {
        this.histories = histories;
        return this;
    }

    public Person addHistory(History history) {
        this.histories.add(history);
        history.setPerson(this);
        return this;
    }

    public Person removeHistory(History history) {
        this.histories.remove(history);
        history.setPerson(null);
        return this;
    }

    public void setHistories(Set<History> histories) {
        this.histories = histories;
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
        Person person = (Person) o;
        if (person.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), person.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Person{" +
            "id=" + getId() +
            ", userName='" + getUserName() + "'" +
            ", email='" + getEmail() + "'" +
            "}";
    }
}
