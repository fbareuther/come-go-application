import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBadgeEvent } from 'app/shared/model/badge-event.model';

type EntityResponseType = HttpResponse<IBadgeEvent>;
type EntityArrayResponseType = HttpResponse<IBadgeEvent[]>;

@Injectable({ providedIn: 'root' })
export class BadgeEventService {
    private resourceUrl = SERVER_API_URL + 'api/badge-events';

    constructor(private http: HttpClient) {}

    create(badgeEvent: IBadgeEvent): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(badgeEvent);
        return this.http
            .post<IBadgeEvent>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(badgeEvent: IBadgeEvent): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(badgeEvent);
        return this.http
            .put<IBadgeEvent>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IBadgeEvent>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBadgeEvent[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(badgeEvent: IBadgeEvent): IBadgeEvent {
        const copy: IBadgeEvent = Object.assign({}, badgeEvent, {
            occurance: badgeEvent.occurance != null && badgeEvent.occurance.isValid() ? badgeEvent.occurance.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.occurance = res.body.occurance != null ? moment(res.body.occurance) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((badgeEvent: IBadgeEvent) => {
            badgeEvent.occurance = badgeEvent.occurance != null ? moment(badgeEvent.occurance) : null;
        });
        return res;
    }
}
