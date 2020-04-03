import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITopbar } from 'app/shared/model/topbar.model';

type EntityResponseType = HttpResponse<ITopbar>;
type EntityArrayResponseType = HttpResponse<ITopbar[]>;

@Injectable({ providedIn: 'root' })
export class TopbarService {
  public resourceUrl = SERVER_API_URL + 'api/topbars';

  constructor(protected http: HttpClient) {}

  create(topbar: ITopbar): Observable<EntityResponseType> {
    return this.http.post<ITopbar>(this.resourceUrl, topbar, { observe: 'response' });
  }

  update(topbar: ITopbar): Observable<EntityResponseType> {
    return this.http.put<ITopbar>(this.resourceUrl, topbar, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ITopbar>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITopbar[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
