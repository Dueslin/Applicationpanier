import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITopbar, Topbar } from 'app/shared/model/topbar.model';
import { TopbarService } from './topbar.service';
import { TopbarComponent } from './topbar.component';
import { TopbarDetailComponent } from './topbar-detail.component';
import { TopbarUpdateComponent } from './topbar-update.component';

@Injectable({ providedIn: 'root' })
export class TopbarResolve implements Resolve<ITopbar> {
  constructor(private service: TopbarService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITopbar> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((topbar: HttpResponse<Topbar>) => {
          if (topbar.body) {
            return of(topbar.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Topbar());
  }
}

export const topbarRoute: Routes = [
  {
    path: '',
    component: TopbarComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Topbars'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TopbarDetailComponent,
    resolve: {
      topbar: TopbarResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Topbars'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TopbarUpdateComponent,
    resolve: {
      topbar: TopbarResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Topbars'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TopbarUpdateComponent,
    resolve: {
      topbar: TopbarResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Topbars'
    },
    canActivate: [UserRouteAccessService]
  }
];
