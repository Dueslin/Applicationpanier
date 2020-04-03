import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProductdetails } from 'app/shared/model/productdetails.model';

type EntityResponseType = HttpResponse<IProductdetails>;
type EntityArrayResponseType = HttpResponse<IProductdetails[]>;

@Injectable({ providedIn: 'root' })
export class ProductdetailsService {
  public resourceUrl = SERVER_API_URL + 'api/productdetails';

  constructor(protected http: HttpClient) {}

  create(productdetails: IProductdetails): Observable<EntityResponseType> {
    return this.http.post<IProductdetails>(this.resourceUrl, productdetails, { observe: 'response' });
  }

  update(productdetails: IProductdetails): Observable<EntityResponseType> {
    return this.http.put<IProductdetails>(this.resourceUrl, productdetails, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IProductdetails>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProductdetails[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
