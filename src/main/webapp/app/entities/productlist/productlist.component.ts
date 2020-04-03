import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProductlist } from '../../../app/shared/model/productlist.model';
import { ProductlistService } from './productlist.service';
import { ProductlistDeleteDialogComponent } from './productlist-delete-dialog.component';




import { products } from '../products';




@Component({
  selector: 'jhi-productlist',
  templateUrl: './productlist.component.html'
})
export class ProductlistComponent implements OnInit, OnDestroy {
  productlists?: IProductlist[];
  eventSubscriber?: Subscription;
  
  
  
  
  
  products = products;
  share() {
    window.alert('The product has been shared!');
  }
  onNotify() {
    window.alert('You will be notified when the product goes on sale');
  }
  
  
  

  constructor(
    protected productlistService: ProductlistService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.productlistService.query().subscribe((res: HttpResponse<IProductlist[]>) => {
      this.productlists = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProductlists();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProductlist): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProductlists(): void {
    this.eventSubscriber = this.eventManager.subscribe('productlistListModification', () => this.loadAll());
  }

  delete(productlist: IProductlist): void {
    const modalRef = this.modalService.open(ProductlistDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.productlist = productlist;
  }
}
