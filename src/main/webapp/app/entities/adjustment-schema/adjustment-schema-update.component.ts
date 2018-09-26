import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IAdjustmentSchema } from 'app/shared/model/adjustment-schema.model';
import { AdjustmentSchemaService } from './adjustment-schema.service';
import { IPerson } from 'app/shared/model/person.model';
import { PersonService } from 'app/entities/person';

@Component({
    selector: 'jhi-adjustment-schema-update',
    templateUrl: './adjustment-schema-update.component.html'
})
export class AdjustmentSchemaUpdateComponent implements OnInit {
    private _adjustmentSchema: IAdjustmentSchema;
    isSaving: boolean;

    people: IPerson[];
    validFrom: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private adjustmentSchemaService: AdjustmentSchemaService,
        private personService: PersonService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ adjustmentSchema }) => {
            this.adjustmentSchema = adjustmentSchema;
        });
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
        this.adjustmentSchema.validFrom = moment(this.validFrom, DATE_TIME_FORMAT);
        if (this.adjustmentSchema.id !== undefined) {
            this.subscribeToSaveResponse(this.adjustmentSchemaService.update(this.adjustmentSchema));
        } else {
            this.subscribeToSaveResponse(this.adjustmentSchemaService.create(this.adjustmentSchema));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAdjustmentSchema>>) {
        result.subscribe((res: HttpResponse<IAdjustmentSchema>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPersonById(index: number, item: IPerson) {
        return item.id;
    }
    get adjustmentSchema() {
        return this._adjustmentSchema;
    }

    set adjustmentSchema(adjustmentSchema: IAdjustmentSchema) {
        this._adjustmentSchema = adjustmentSchema;
        this.validFrom = moment(adjustmentSchema.validFrom).format(DATE_TIME_FORMAT);
    }
}
