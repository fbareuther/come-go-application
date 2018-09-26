import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdjustmentSchema } from 'app/shared/model/adjustment-schema.model';
import { AdjustmentSchemaService } from './adjustment-schema.service';
import { AdjustmentSchemaComponent } from './adjustment-schema.component';
import { AdjustmentSchemaDetailComponent } from './adjustment-schema-detail.component';
import { AdjustmentSchemaUpdateComponent } from './adjustment-schema-update.component';
import { AdjustmentSchemaDeletePopupComponent } from './adjustment-schema-delete-dialog.component';
import { IAdjustmentSchema } from 'app/shared/model/adjustment-schema.model';

@Injectable({ providedIn: 'root' })
export class AdjustmentSchemaResolve implements Resolve<IAdjustmentSchema> {
    constructor(private service: AdjustmentSchemaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((adjustmentSchema: HttpResponse<AdjustmentSchema>) => adjustmentSchema.body));
        }
        return of(new AdjustmentSchema());
    }
}

export const adjustmentSchemaRoute: Routes = [
    {
        path: 'adjustment-schema',
        component: AdjustmentSchemaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'comeGoApp.adjustmentSchema.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'adjustment-schema/:id/view',
        component: AdjustmentSchemaDetailComponent,
        resolve: {
            adjustmentSchema: AdjustmentSchemaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'comeGoApp.adjustmentSchema.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'adjustment-schema/new',
        component: AdjustmentSchemaUpdateComponent,
        resolve: {
            adjustmentSchema: AdjustmentSchemaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'comeGoApp.adjustmentSchema.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'adjustment-schema/:id/edit',
        component: AdjustmentSchemaUpdateComponent,
        resolve: {
            adjustmentSchema: AdjustmentSchemaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'comeGoApp.adjustmentSchema.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const adjustmentSchemaPopupRoute: Routes = [
    {
        path: 'adjustment-schema/:id/delete',
        component: AdjustmentSchemaDeletePopupComponent,
        resolve: {
            adjustmentSchema: AdjustmentSchemaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'comeGoApp.adjustmentSchema.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
