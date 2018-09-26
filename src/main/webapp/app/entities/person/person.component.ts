import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPerson } from 'app/shared/model/person.model';
import { Principal } from 'app/core';
import { PersonService } from './person.service';

@Component({
    selector: 'jhi-person',
    templateUrl: './person.component.html'
})
export class PersonComponent implements OnInit, OnDestroy {
    people: IPerson[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private personService: PersonService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.personService.query().subscribe(
            (res: HttpResponse<IPerson[]>) => {
                this.people = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPeople();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPerson) {
        return item.id;
    }

    registerChangeInPeople() {
        this.eventSubscriber = this.eventManager.subscribe('personListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
