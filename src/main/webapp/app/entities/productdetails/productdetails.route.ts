import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProductdetails, Productdetails } from 'app/shared/model/productdetails.model';
import { ProductdetailsService } from './productdetails.service';
import { ProductdetailsComponent } from './productdetails.component';
import { ProductdetailsDetailComponent } from './productdetails-detail.component';
import { ProductdetailsUpdateComponent } from './productdetails-update.component';

@Injectable({ providedIn: 'root' })
export class ProductdetailsResolve implements Resolve<IProductdetails> {
  constructor(private service: ProductdetailsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProductdetails> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((productdetails: HttpResponse<Productdetails>) => {
          if (productdetails.body) {
            return of(productdetails.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Productdetails());
  }
}

export const productdetailsRoute: Routes = [
  {
    path: '',
    component: ProductdetailsComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Productdetails'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProductdetailsDetailComponent,
    resolve: {
      productdetails: ProductdetailsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Productdetails'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProductdetailsUpdateComponent,
    resolve: {
      productdetails: ProductdetailsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Productdetails'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProductdetailsUpdateComponent,
    resolve: {
      productdetails: ProductdetailsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Productdetails'
    },
    canActivate: [UserRouteAccessService]
  }
];
