import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAdjustmentSchema } from 'app/shared/model/adjustment-schema.model';
import { Principal } from 'app/core';
import { AdjustmentSchemaService } from './adjustment-schema.service';

@Component({
    selector: 'jhi-adjustment-schema',
    templateUrl: './adjustment-schema.component.html'
})
export class AdjustmentSchemaComponent implements OnInit, OnDestroy {
    adjustmentSchemas: IAdjustmentSchema[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private adjustmentSchemaService: AdjustmentSchemaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.adjustmentSchemaService.query().subscribe(
            (res: HttpResponse<IAdjustmentSchema[]>) => {
                this.adjustmentSchemas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAdjustmentSchemas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAdjustmentSchema) {
        return item.id;
    }

    registerChangeInAdjustmentSchemas() {
        this.eventSubscriber = this.eventManager.subscribe('adjustmentSchemaListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
