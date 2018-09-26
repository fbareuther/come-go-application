package io.comego.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A History.
 */
@Entity
@Table(name = "history")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class History implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "actual_date")
    private LocalDate actualDate;

    @Column(name = "start_event")
    private Instant startEvent;

    @Column(name = "end_event")
    private Instant endEvent;

    @Column(name = "gross_hours")
    private Float grossHours;

    @Column(name = "deduction_hours")
    private Float deductionHours;

    @Column(name = "addition_hours")
    private Float additionHours;

    @Column(name = "net_hours")
    private Float netHours;

    @OneToOne
    @JoinColumn(unique = true)
    private Badge badge;

    @ManyToOne
    @JsonIgnoreProperties("histories")
    private Person person;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getActualDate() {
        return actualDate;
    }

    public History actualDate(LocalDate actualDate) {
        this.actualDate = actualDate;
        return this;
    }

    public void setActualDate(LocalDate actualDate) {
        this.actualDate = actualDate;
    }

    public Instant getStartEvent() {
        return startEvent;
    }

    public History startEvent(Instant startEvent) {
        this.startEvent = startEvent;
        return this;
    }

    public void setStartEvent(Instant startEvent) {
        this.startEvent = startEvent;
    }

    public Instant getEndEvent() {
        return endEvent;
    }

    public History endEvent(Instant endEvent) {
        this.endEvent = endEvent;
        return this;
    }

    public void setEndEvent(Instant endEvent) {
        this.endEvent = endEvent;
    }

    public Float getGrossHours() {
        return grossHours;
    }

    public History grossHours(Float grossHours) {
        this.grossHours = grossHours;
        return this;
    }

    public void setGrossHours(Float grossHours) {
        this.grossHours = grossHours;
    }

    public Float getDeductionHours() {
        return deductionHours;
    }

    public History deductionHours(Float deductionHours) {
        this.deductionHours = deductionHours;
        return this;
    }

    public void setDeductionHours(Float deductionHours) {
        this.deductionHours = deductionHours;
    }

    public Float getAdditionHours() {
        return additionHours;
    }

    public History additionHours(Float additionHours) {
        this.additionHours = additionHours;
        return this;
    }

    public void setAdditionHours(Float additionHours) {
        this.additionHours = additionHours;
    }

    public Float getNetHours() {
        return netHours;
    }

    public History netHours(Float netHours) {
        this.netHours = netHours;
        return this;
    }

    public void setNetHours(Float netHours) {
        this.netHours = netHours;
    }

    public Badge getBadge() {
        return badge;
    }

    public History badge(Badge badge) {
        this.badge = badge;
        return this;
    }

    public void setBadge(Badge badge) {
        this.badge = badge;
    }

    public Person getPerson() {
        return person;
    }

    public History person(Person person) {
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
        History history = (History) o;
        if (history.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), history.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "History{" +
            "id=" + getId() +
            ", actualDate='" + getActualDate() + "'" +
            ", startEvent='" + getStartEvent() + "'" +
            ", endEvent='" + getEndEvent() + "'" +
            ", grossHours=" + getGrossHours() +
            ", deductionHours=" + getDeductionHours() +
            ", additionHours=" + getAdditionHours() +
            ", netHours=" + getNetHours() +
            "}";
    }
}
