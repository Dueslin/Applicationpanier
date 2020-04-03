import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITopbar } from 'app/shared/model/topbar.model';
import { TopbarService } from './topbar.service';

@Component({
  templateUrl: './topbar-delete-dialog.component.html'
})
export class TopbarDeleteDialogComponent {
  topbar?: ITopbar;

  constructor(protected topbarService: TopbarService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.topbarService.delete(id).subscribe(() => {
      this.eventManager.broadcast('topbarListModification');
      this.activeModal.close();
    });
  }
}
