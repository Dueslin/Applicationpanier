import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductalerts } from 'app/shared/model/productalerts.model';
import { ProductalertsService } from './productalerts.service';

@Component({
  templateUrl: './productalerts-delete-dialog.component.html'
})
export class ProductalertsDeleteDialogComponent {
  productalerts?: IProductalerts;

  constructor(
    protected productalertsService: ProductalertsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.productalertsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('productalertsListModification');
      this.activeModal.close();
    });
  }
}
