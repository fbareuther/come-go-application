import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IHistory } from 'app/shared/model/history.model';

type EntityResponseType = HttpResponse<IHistory>;
type EntityArrayResponseType = HttpResponse<IHistory[]>;

@Injectable({ providedIn: 'root' })
export class HistoryService {
    private resourceUrl = SERVER_API_URL + 'api/histories';

    constructor(private http: HttpClient) {}

    create(history: IHistory): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(history);
        return this.http
            .post<IHistory>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(history: IHistory): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(history);
        return this.http
            .put<IHistory>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IHistory>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IHistory[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(history: IHistory): IHistory {
        const copy: IHistory = Object.assign({}, history, {
            actualDate: history.actualDate != null && history.actualDate.isValid() ? history.actualDate.format(DATE_FORMAT) : null,
            startEvent: history.startEvent != null && history.startEvent.isValid() ? history.startEvent.toJSON() : null,
            endEvent: history.endEvent != null && history.endEvent.isValid() ? history.endEvent.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.actualDate = res.body.actualDate != null ? moment(res.body.actualDate) : null;
        res.body.startEvent = res.body.startEvent != null ? moment(res.body.startEvent) : null;
        res.body.endEvent = res.body.endEvent != null ? moment(res.body.endEvent) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((history: IHistory) => {
            history.actualDate = history.actualDate != null ? moment(history.actualDate) : null;
            history.startEvent = history.startEvent != null ? moment(history.startEvent) : null;
            history.endEvent = history.endEvent != null ? moment(history.endEvent) : null;
        });
        return res;
    }
}
