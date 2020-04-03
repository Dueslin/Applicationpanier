import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProductlist, Productlist } from 'app/shared/model/productlist.model';
import { ProductlistService } from './productlist.service';
import { ProductlistComponent } from './productlist.component';
import { ProductlistDetailComponent } from './productlist-detail.component';
import { ProductlistUpdateComponent } from './productlist-update.component';

@Injectable({ providedIn: 'root' })
export class ProductlistResolve implements Resolve<IProductlist> {
  constructor(private service: ProductlistService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProductlist> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((productlist: HttpResponse<Productlist>) => {
          if (productlist.body) {
            return of(productlist.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Productlist());
  }
}

export const productlistRoute: Routes = [
  {
    path: '',
    component: ProductlistComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Productlists'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProductlistDetailComponent,
    resolve: {
      productlist: ProductlistResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Productlists'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProductlistUpdateComponent,
    resolve: {
      productlist: ProductlistResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Productlists'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProductlistUpdateComponent,
    resolve: {
      productlist: ProductlistResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Productlists'
    },
    canActivate: [UserRouteAccessService]
  }
];
