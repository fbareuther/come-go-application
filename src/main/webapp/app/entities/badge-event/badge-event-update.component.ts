import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IBadgeEvent } from 'app/shared/model/badge-event.model';
import { BadgeEventService } from './badge-event.service';
import { IBadge } from 'app/shared/model/badge.model';
import { BadgeService } from 'app/entities/badge';

@Component({
    selector: 'jhi-badge-event-update',
    templateUrl: './badge-event-update.component.html'
})
export class BadgeEventUpdateComponent implements OnInit {
    private _badgeEvent: IBadgeEvent;
    isSaving: boolean;

    badges: IBadge[];
    occurance: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private badgeEventService: BadgeEventService,
        private badgeService: BadgeService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ badgeEvent }) => {
            this.badgeEvent = badgeEvent;
        });
        this.badgeService.query().subscribe(
            (res: HttpResponse<IBadge[]>) => {
                this.badges = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.badgeEvent.occurance = moment(this.occurance, DATE_TIME_FORMAT);
        if (this.badgeEvent.id !== undefined) {
            this.subscribeToSaveResponse(this.badgeEventService.update(this.badgeEvent));
        } else {
            this.subscribeToSaveResponse(this.badgeEventService.create(this.badgeEvent));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IBadgeEvent>>) {
        result.subscribe((res: HttpResponse<IBadgeEvent>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackBadgeById(index: number, item: IBadge) {
        return item.id;
    }
    get badgeEvent() {
        return this._badgeEvent;
    }

    set badgeEvent(badgeEvent: IBadgeEvent) {
        this._badgeEvent = badgeEvent;
        this.occurance = moment(badgeEvent.occurance).format(DATE_TIME_FORMAT);
    }
}
