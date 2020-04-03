import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITopbar } from '../../../app/shared/model/topbar.model';
import { TopbarService } from './topbar.service';
import { TopbarDeleteDialogComponent } from './topbar-delete-dialog.component';

@Component({
  selector: 'jhi-topbar',
  templateUrl: './topbar.component.html'
})
export class TopbarComponent implements OnInit, OnDestroy {
  topbars?: ITopbar[];
  eventSubscriber?: Subscription;

  constructor(protected topbarService: TopbarService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.topbarService.query().subscribe((res: HttpResponse<ITopbar[]>) => {
      this.topbars = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTopbars();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITopbar): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTopbars(): void {
    this.eventSubscriber = this.eventManager.subscribe('topbarListModification', () => this.loadAll());
  }

  delete(topbar: ITopbar): void {
    const modalRef = this.modalService.open(TopbarDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.topbar = topbar;
  }
}
