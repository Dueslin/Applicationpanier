import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProductalerts } from 'app/shared/model/productalerts.model';

type EntityResponseType = HttpResponse<IProductalerts>;
type EntityArrayResponseType = HttpResponse<IProductalerts[]>;

@Injectable({ providedIn: 'root' })
export class ProductalertsService {
  public resourceUrl = SERVER_API_URL + 'api/productalerts';

  constructor(protected http: HttpClient) {}

  create(productalerts: IProductalerts): Observable<EntityResponseType> {
    return this.http.post<IProductalerts>(this.resourceUrl, productalerts, { observe: 'response' });
  }

  update(productalerts: IProductalerts): Observable<EntityResponseType> {
    return this.http.put<IProductalerts>(this.resourceUrl, productalerts, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IProductalerts>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProductalerts[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
