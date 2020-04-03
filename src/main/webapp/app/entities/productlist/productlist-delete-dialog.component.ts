import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductlist } from 'app/shared/model/productlist.model';
import { ProductlistService } from './productlist.service';

@Component({
  templateUrl: './productlist-delete-dialog.component.html'
})
export class ProductlistDeleteDialogComponent {
  productlist?: IProductlist;

  constructor(
    protected productlistService: ProductlistService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.productlistService.delete(id).subscribe(() => {
      this.eventManager.broadcast('productlistListModification');
      this.activeModal.close();
    });
  }
}
