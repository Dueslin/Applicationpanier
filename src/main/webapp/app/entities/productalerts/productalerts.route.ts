import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProductalerts, Productalerts } from 'app/shared/model/productalerts.model';
import { ProductalertsService } from './productalerts.service';
import { ProductalertsComponent } from './productalerts.component';
import { ProductalertsDetailComponent } from './productalerts-detail.component';
import { ProductalertsUpdateComponent } from './productalerts-update.component';

@Injectable({ providedIn: 'root' })
export class ProductalertsResolve implements Resolve<IProductalerts> {
  constructor(private service: ProductalertsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProductalerts> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((productalerts: HttpResponse<Productalerts>) => {
          if (productalerts.body) {
            return of(productalerts.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Productalerts());
  }
}

export const productalertsRoute: Routes = [
  {
    path: '',
    component: ProductalertsComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Productalerts'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProductalertsDetailComponent,
    resolve: {
      productalerts: ProductalertsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Productalerts'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProductalertsUpdateComponent,
    resolve: {
      productalerts: ProductalertsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Productalerts'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProductalertsUpdateComponent,
    resolve: {
      productalerts: ProductalertsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Productalerts'
    },
    canActivate: [UserRouteAccessService]
  }
];
