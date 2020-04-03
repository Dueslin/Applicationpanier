import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductdetails } from 'app/shared/model/productdetails.model';

@Component({
  selector: 'jhi-productdetails-detail',
  templateUrl: './productdetails-detail.component.html'
})
export class ProductdetailsDetailComponent implements OnInit {
  productdetails: IProductdetails | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productdetails }) => {
      this.productdetails = productdetails;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
