import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAdjustmentSchema } from 'app/shared/model/adjustment-schema.model';

type EntityResponseType = HttpResponse<IAdjustmentSchema>;
type EntityArrayResponseType = HttpResponse<IAdjustmentSchema[]>;

@Injectable({ providedIn: 'root' })
export class AdjustmentSchemaService {
    private resourceUrl = SERVER_API_URL + 'api/adjustment-schemas';

    constructor(private http: HttpClient) {}

    create(adjustmentSchema: IAdjustmentSchema): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(adjustmentSchema);
        return this.http
            .post<IAdjustmentSchema>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(adjustmentSchema: IAdjustmentSchema): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(adjustmentSchema);
        return this.http
            .put<IAdjustmentSchema>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IAdjustmentSchema>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IAdjustmentSchema[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(adjustmentSchema: IAdjustmentSchema): IAdjustmentSchema {
        const copy: IAdjustmentSchema = Object.assign({}, adjustmentSchema, {
            validFrom:
                adjustmentSchema.validFrom != null && adjustmentSchema.validFrom.isValid() ? adjustmentSchema.validFrom.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.validFrom = res.body.validFrom != null ? moment(res.body.validFrom) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((adjustmentSchema: IAdjustmentSchema) => {
            adjustmentSchema.validFrom = adjustmentSchema.validFrom != null ? moment(adjustmentSchema.validFrom) : null;
        });
        return res;
    }
}
