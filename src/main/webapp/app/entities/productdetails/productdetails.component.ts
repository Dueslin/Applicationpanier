import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IProductdetails } from '../../../app/shared/model/productdetails.model';
import { ProductdetailsService } from './productdetails.service';
import { ProductdetailsDeleteDialogComponent } from './productdetails-delete-dialog.component';

import { ActivatedRoute } from '@angular/router';
import { products } from '../products';
import { CartService } from '../cart.service';

@Component({
  selector: 'jhi-productdetails',
  templateUrl: './productdetails.component.html'
})
export class ProductdetailsComponent implements OnInit, OnDestroy {
  product=products[0];
  productdetails?: IProductdetails[];
  eventSubscriber?: Subscription;
  
    
   //product=products;
   addToCart() {
    window.alert('Your product has been added to the cart!');
    this.cartService.addToCart(products[0]);
  }
  
  
// ERROR in D:/WORKSPACES/JHIPSTER/Applicationpanier/src/main/webapp/app/entities/productdetails/productdetails.component.ts(37,4):
// TS7008: Member 'product' implicitly has an 'any' type.
// ERROR in D:/WORKSPACES/JHIPSTER/Applicationpanier/src/main/webapp/app/entities/productdetails/productdetails.component.ts(38,14):
// TS7006: Parameter 'product' implicitly has an 'any' type.
// ERROR in D:/WORKSPACES/JHIPSTER/Applicationpanier/src/main/webapp/app/entities/productdetails/productdetails.component.ts(81,30):
// TS2531: Object is possibly 'null'.
  

  constructor(
    protected productdetailsService: ProductdetailsService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
	
	
	
	 private route: ActivatedRoute,
     private cartService: CartService
	
	
	
	
  ) {}

  loadAll(): void {
    this.productdetailsService.query().subscribe((res: HttpResponse<IProductdetails[]>) => {
      this.productdetails = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProductdetails();
	
	
	
	
	
	
	 this.route.paramMap.subscribe(params => {
    this.product = products[+params.get('productId')];
  });
	
	
	
	
	
	
	
	
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProductdetails): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProductdetails(): void {
    this.eventSubscriber = this.eventManager.subscribe('productdetailsListModification', () => this.loadAll());
  }

  delete(productdetails: IProductdetails): void {
    const modalRef = this.modalService.open(ProductdetailsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.productdetails = productdetails;
  }
}
