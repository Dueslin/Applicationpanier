import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICart } from '../../../app/shared/model/cart.model';
import { CartService } from '../cart.service';
import { CartDeleteDialogComponent } from './cart-delete-dialog.component';




import { FormBuilder } from '@angular/forms';





@Component({
  selector: 'jhi-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit, OnDestroy {
  carts?: ICart[];
  eventSubscriber?: Subscription;
  
  
  
  
   items;
  checkoutForm;
  
  
  

  constructor(
  protected cartService: CartService, 
  protected eventManager: JhiEventManager, 
  protected modalService: NgbModal
  
  ,
  
  private formBuilder: FormBuilder
  
  
  
  
  
  
  ) {
	  
	  
	  
	  
	this.items = this.cartService.getItems();

    this.checkoutForm = this.formBuilder.group({
      name: '',
      address: ''
    });
	  
	  
	  
	  
	  
	  
	  
  }

  loadAll(): void {
    this.cartService.query().subscribe((res: HttpResponse<ICart[]>) => {
      this.carts = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCarts();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICart): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCarts(): void {
    this.eventSubscriber = this.eventManager.subscribe('cartListModification', () => this.loadAll());
  }

  delete(cart: ICart): void {
    const modalRef = this.modalService.open(CartDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cart = cart;
  }
  
  
  
  
  
  
  
  
  onSubmit(customerData) {
    // Process checkout data here
    console.warn('Your order has been submitted', customerData);

    this.items = this.cartService.clearCart();
    this.checkoutForm.reset();
  }
  
  
  
  
  
  
  
  
  
}
