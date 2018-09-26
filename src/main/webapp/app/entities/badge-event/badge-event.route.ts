import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BadgeEvent } from 'app/shared/model/badge-event.model';
import { BadgeEventService } from './badge-event.service';
import { BadgeEventComponent } from './badge-event.component';
import { BadgeEventDetailComponent } from './badge-event-detail.component';
import { BadgeEventUpdateComponent } from './badge-event-update.component';
import { BadgeEventDeletePopupComponent } from './badge-event-delete-dialog.component';
import { IBadgeEvent } from 'app/shared/model/badge-event.model';

@Injectable({ providedIn: 'root' })
export class BadgeEventResolve implements Resolve<IBadgeEvent> {
    constructor(private service: BadgeEventService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((badgeEvent: HttpResponse<BadgeEvent>) => badgeEvent.body));
        }
        return of(new BadgeEvent());
    }
}

export const badgeEventRoute: Routes = [
    {
        path: 'badge-event',
        component: BadgeEventComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'comeGoApp.badgeEvent.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'badge-event/:id/view',
        component: BadgeEventDetailComponent,
        resolve: {
            badgeEvent: BadgeEventResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'comeGoApp.badgeEvent.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'badge-event/new',
        component: BadgeEventUpdateComponent,
        resolve: {
            badgeEvent: BadgeEventResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'comeGoApp.badgeEvent.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'badge-event/:id/edit',
        component: BadgeEventUpdateComponent,
        resolve: {
            badgeEvent: BadgeEventResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'comeGoApp.badgeEvent.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const badgeEventPopupRoute: Routes = [
    {
        path: 'badge-event/:id/delete',
        component: BadgeEventDeletePopupComponent,
        resolve: {
            badgeEvent: BadgeEventResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'comeGoApp.badgeEvent.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
