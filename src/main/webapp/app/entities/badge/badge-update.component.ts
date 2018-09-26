import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IBadge } from 'app/shared/model/badge.model';
import { BadgeService } from './badge.service';
import { IHistory } from 'app/shared/model/history.model';
import { HistoryService } from 'app/entities/history';
import { IPerson } from 'app/shared/model/person.model';
import { PersonService } from 'app/entities/person';

@Component({
    selector: 'jhi-badge-update',
    templateUrl: './badge-update.component.html'
})
export class BadgeUpdateComponent implements OnInit {
    private _badge: IBadge;
    isSaving: boolean;

    histories: IHistory[];

    people: IPerson[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private badgeService: BadgeService,
        private historyService: HistoryService,
        private personService: PersonService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ badge }) => {
            this.badge = badge;
        });
        this.historyService.query().subscribe(
            (res: HttpResponse<IHistory[]>) => {
                this.histories = res.body;
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
        if (this.badge.id !== undefined) {
            this.subscribeToSaveResponse(this.badgeService.update(this.badge));
        } else {
            this.subscribeToSaveResponse(this.badgeService.create(this.badge));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IBadge>>) {
        result.subscribe((res: HttpResponse<IBadge>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackHistoryById(index: number, item: IHistory) {
        return item.id;
    }

    trackPersonById(index: number, item: IPerson) {
        return item.id;
    }
    get badge() {
        return this._badge;
    }

    set badge(badge: IBadge) {
        this._badge = badge;
    }
}
