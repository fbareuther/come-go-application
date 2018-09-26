import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ComeGoAppSharedModule } from 'app/shared';
import {
    AdjustmentSchemaComponent,
    AdjustmentSchemaDetailComponent,
    AdjustmentSchemaUpdateComponent,
    AdjustmentSchemaDeletePopupComponent,
    AdjustmentSchemaDeleteDialogComponent,
    adjustmentSchemaRoute,
    adjustmentSchemaPopupRoute
} from './';

const ENTITY_STATES = [...adjustmentSchemaRoute, ...adjustmentSchemaPopupRoute];

@NgModule({
    imports: [ComeGoAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AdjustmentSchemaComponent,
        AdjustmentSchemaDetailComponent,
        AdjustmentSchemaUpdateComponent,
        AdjustmentSchemaDeleteDialogComponent,
        AdjustmentSchemaDeletePopupComponent
    ],
    entryComponents: [
        AdjustmentSchemaComponent,
        AdjustmentSchemaUpdateComponent,
        AdjustmentSchemaDeleteDialogComponent,
        AdjustmentSchemaDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComeGoAppAdjustmentSchemaModule {}
