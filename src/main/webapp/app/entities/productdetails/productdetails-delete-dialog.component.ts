import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductdetails } from 'app/shared/model/productdetails.model';
import { ProductdetailsService } from './productdetails.service';

@Component({
  templateUrl: './productdetails-delete-dialog.component.html'
})
export class ProductdetailsDeleteDialogComponent {
  productdetails?: IProductdetails;

  constructor(
    protected productdetailsService: ProductdetailsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.productdetailsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('productdetailsListModification');
      this.activeModal.close();
    });
  }
}
