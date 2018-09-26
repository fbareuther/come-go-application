import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBadge } from 'app/shared/model/badge.model';
import { Principal } from 'app/core';
import { BadgeService } from './badge.service';

@Component({
    selector: 'jhi-badge',
    templateUrl: './badge.component.html'
})
export class BadgeComponent implements OnInit, OnDestroy {
    badges: IBadge[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private badgeService: BadgeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.badgeService.query().subscribe(
            (res: HttpResponse<IBadge[]>) => {
                this.badges = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInBadges();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IBadge) {
        return item.id;
    }

    registerChangeInBadges() {
        this.eventSubscriber = this.eventManager.subscribe('badgeListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
