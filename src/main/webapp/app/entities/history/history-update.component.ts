import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IHistory } from 'app/shared/model/history.model';
import { HistoryService } from './history.service';
import { IBadge } from 'app/shared/model/badge.model';
import { BadgeService } from 'app/entities/badge';
import { IPerson } from 'app/shared/model/person.model';
import { PersonService } from 'app/entities/person';

@Component({
    selector: 'jhi-history-update',
    templateUrl: './history-update.component.html'
})
export class HistoryUpdateComponent implements OnInit {
    private _history: IHistory;
    isSaving: boolean;

    badges: IBadge[];

    people: IPerson[];
    actualDateDp: any;
    startEvent: string;
    endEvent: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private historyService: HistoryService,
        private badgeService: BadgeService,
        private personService: PersonService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ history }) => {
            this.history = history;
        });
        this.badgeService.query({ filter: 'history-is-null' }).subscribe(
            (res: HttpResponse<IBadge[]>) => {
                if (!this.history.badge || !this.history.badge.id) {
                    this.badges = res.body;
                } else {
                    this.badgeService.find(this.history.badge.id).subscribe(
                        (subRes: HttpResponse<IBadge>) => {
                            this.badges = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.personService.query().subscribe(
            (res: HttpResponse<IPerson[]>) => {
                this.people = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.history.startEvent = moment(this.startEvent, DATE_TIME_FORMAT);
        this.history.endEvent = moment(this.endEvent, DATE_TIME_FORMAT);
        if (this.history.id !== undefined) {
            this.subscribeToSaveResponse(this.historyService.update(this.history));
        } else {
            this.subscribeToSaveResponse(this.historyService.create(this.history));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IHistory>>) {
        result.subscribe((res: HttpResponse<IHistory>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPersonById(index: number, item: IPerson) {
        return item.id;
    }
    get history() {
        return this._history;
    }

    set history(history: IHistory) {
        this._history = history;
        this.startEvent = moment(history.startEvent).format(DATE_TIME_FORMAT);
        this.endEvent = moment(history.endEvent).format(DATE_TIME_FORMAT);
    }
}
