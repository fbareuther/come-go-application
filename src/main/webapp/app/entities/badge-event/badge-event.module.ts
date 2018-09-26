import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ComeGoAppSharedModule } from 'app/shared';
import {
    BadgeEventComponent,
    BadgeEventDetailComponent,
    BadgeEventUpdateComponent,
    BadgeEventDeletePopupComponent,
    BadgeEventDeleteDialogComponent,
    badgeEventRoute,
    badgeEventPopupRoute
} from './';

const ENTITY_STATES = [...badgeEventRoute, ...badgeEventPopupRoute];

@NgModule({
    imports: [ComeGoAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BadgeEventComponent,
        BadgeEventDetailComponent,
        BadgeEventUpdateComponent,
        BadgeEventDeleteDialogComponent,
        BadgeEventDeletePopupComponent
    ],
    entryComponents: [BadgeEventComponent, BadgeEventUpdateComponent, BadgeEventDeleteDialogComponent, BadgeEventDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComeGoAppBadgeEventModule {}
