import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ComeGoAppPersonModule } from './person/person.module';
import { ComeGoAppBadgeModule } from './badge/badge.module';
import { ComeGoAppBadgeEventModule } from './badge-event/badge-event.module';
import { ComeGoAppAdjustmentSchemaModule } from './adjustment-schema/adjustment-schema.module';
import { ComeGoAppHistoryModule } from './history/history.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        ComeGoAppPersonModule,
        ComeGoAppBadgeModule,
        ComeGoAppBadgeEventModule,
        ComeGoAppAdjustmentSchemaModule,
        ComeGoAppHistoryModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComeGoAppEntityModule {}
