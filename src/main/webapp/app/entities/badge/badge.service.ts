import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBadge } from 'app/shared/model/badge.model';

type EntityResponseType = HttpResponse<IBadge>;
type EntityArrayResponseType = HttpResponse<IBadge[]>;

@Injectable({ providedIn: 'root' })
export class BadgeService {
    private resourceUrl = SERVER_API_URL + 'api/badges';

    constructor(private http: HttpClient) {}

    create(badge: IBadge): Observable<EntityResponseType> {
        return this.http.post<IBadge>(this.resourceUrl, badge, { observe: 'response' });
    }

    update(badge: IBadge): Observable<EntityResponseType> {
        return this.http.put<IBadge>(this.resourceUrl, badge, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IBadge>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IBadge[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
