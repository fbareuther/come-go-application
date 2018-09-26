import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAdjustmentSchema } from 'app/shared/model/adjustment-schema.model';

@Component({
    selector: 'jhi-adjustment-schema-detail',
    templateUrl: './adjustment-schema-detail.component.html'
})
export class AdjustmentSchemaDetailComponent implements OnInit {
    adjustmentSchema: IAdjustmentSchema;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ adjustmentSchema }) => {
            this.adjustmentSchema = adjustmentSchema;
        });
    }

    previousState() {
        window.history.back();
    }
}
