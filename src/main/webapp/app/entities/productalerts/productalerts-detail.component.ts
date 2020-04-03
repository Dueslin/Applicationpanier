import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductalerts } from 'app/shared/model/productalerts.model';

@Component({
  selector: 'jhi-productalerts-detail',
  templateUrl: './productalerts-detail.component.html'
})
export class ProductalertsDetailComponent implements OnInit {
  productalerts: IProductalerts | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productalerts }) => {
      this.productalerts = productalerts;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
