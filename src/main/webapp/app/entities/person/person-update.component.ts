import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPerson } from 'app/shared/model/person.model';
import { PersonService } from './person.service';
import { IAdjustmentSchema } from 'app/shared/model/adjustment-schema.model';
import { AdjustmentSchemaService } from 'app/entities/adjustment-schema';

@Component({
    selector: 'jhi-person-update',
    templateUrl: './person-update.component.html'
})
export class PersonUpdateComponent implements OnInit {
    private _person: IPerson;
    isSaving: boolean;

    adjustmentschemas: IAdjustmentSchema[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private personService: PersonService,
        private adjustmentSchemaService: AdjustmentSchemaService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ person }) => {
            this.person = person;
        });
        this.adjustmentSchemaService.query({ filter: 'person-is-null' }).subscribe(
            (res: HttpResponse<IAdjustmentSchema[]>) => {
                if (!this.person.adjustmentSchema || !this.person.adjustmentSchema.id) {
                    this.adjustmentschemas = res.body;
                } else {
                    this.adjustmentSchemaService.find(this.person.adjustmentSchema.id).subscribe(
                        (subRes: HttpResponse<IAdjustmentSchema>) => {
                            this.adjustmentschemas = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.person.id !== undefined) {
            this.subscribeToSaveResponse(this.personService.update(this.person));
        } else {
            this.subscribeToSaveResponse(this.personService.create(this.person));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPerson>>) {
        result.subscribe((res: HttpResponse<IPerson>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackAdjustmentSchemaById(index: number, item: IAdjustmentSchema) {
        return item.id;
    }
    get person() {
        return this._person;
    }

    set person(person: IPerson) {
        this._person = person;
    }
}
