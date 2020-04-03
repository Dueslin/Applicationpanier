import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProductalerts } from '../../../app/shared/model/productalerts.model';
import { ProductalertsService } from './productalerts.service';
import { ProductalertsDeleteDialogComponent } from './productalerts-delete-dialog.component';




import { Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { products } from '../products';




@Component({
  selector: 'jhi-productalerts',
  templateUrl: './productalerts.component.html'
})
export class ProductalertsComponent implements OnInit, OnDestroy {
  productalerts?: IProductalerts[];
  eventSubscriber?: Subscription;
  
   
  product = products;
  
    
   

    //@Output()
    //notify = new EventEmitter();
  
  
  
  
  

  constructor(
    protected productalertsService: ProductalertsService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.productalertsService.query().subscribe((res: HttpResponse<IProductalerts[]>) => {
      this.productalerts = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProductalerts();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProductalerts): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProductalerts(): void {
    this.eventSubscriber = this.eventManager.subscribe('productalertsListModification', () => this.loadAll());
  }

  delete(productalerts: IProductalerts): void {
    const modalRef = this.modalService.open(ProductalertsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.productalerts = productalerts;
  }
}
