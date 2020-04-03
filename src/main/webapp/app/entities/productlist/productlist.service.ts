import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProductlist } from 'app/shared/model/productlist.model';

type EntityResponseType = HttpResponse<IProductlist>;
type EntityArrayResponseType = HttpResponse<IProductlist[]>;

@Injectable({ providedIn: 'root' })
export class ProductlistService {
  public resourceUrl = SERVER_API_URL + 'api/productlists';

  constructor(protected http: HttpClient) {}

  create(productlist: IProductlist): Observable<EntityResponseType> {
    return this.http.post<IProductlist>(this.resourceUrl, productlist, { observe: 'response' });
  }

  update(productlist: IProductlist): Observable<EntityResponseType> {
    return this.http.put<IProductlist>(this.resourceUrl, productlist, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IProductlist>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProductlist[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
