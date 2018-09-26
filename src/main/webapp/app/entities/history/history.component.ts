import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IHistory } from 'app/shared/model/history.model';
import { Principal } from 'app/core';
import { HistoryService } from './history.service';

@Component({
    selector: 'jhi-history',
    templateUrl: './history.component.html'
})
export class HistoryComponent implements OnInit, OnDestroy {
    histories: IHistory[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private historyService: HistoryService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.historyService.query().subscribe(
            (res: HttpResponse<IHistory[]>) => {
                this.histories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInHistories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IHistory) {
        return item.id;
    }

    registerChangeInHistories() {
        this.eventSubscriber = this.eventManager.subscribe('historyListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
