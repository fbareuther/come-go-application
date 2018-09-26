import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBadgeEvent } from 'app/shared/model/badge-event.model';
import { Principal } from 'app/core';
import { BadgeEventService } from './badge-event.service';

@Component({
    selector: 'jhi-badge-event',
    templateUrl: './badge-event.component.html'
})
export class BadgeEventComponent implements OnInit, OnDestroy {
    badgeEvents: IBadgeEvent[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private badgeEventService: BadgeEventService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.badgeEventService.query().subscribe(
            (res: HttpResponse<IBadgeEvent[]>) => {
                this.badgeEvents = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInBadgeEvents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IBadgeEvent) {
        return item.id;
    }

    registerChangeInBadgeEvents() {
        this.eventSubscriber = this.eventManager.subscribe('badgeEventListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
