import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductlist } from 'app/shared/model/productlist.model';

@Component({
  selector: 'jhi-productlist-detail',
  templateUrl: './productlist-detail.component.html'
})
export class ProductlistDetailComponent implements OnInit {
  productlist: IProductlist | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productlist }) => {
      this.productlist = productlist;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
