import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() {}

  items = [];
product;


addToCart(product) {
    this.items.push(product);
  }

getItems() {
    return this.items;
  }

clearCart() {
    this.items = [];
    return this.items;
  }
}

//ERROR in D:/WORKSPACES/JHIPSTER/Applicationpanier/src/main/webapp/app/entities/cart.service.ts(12,11):
//TS7006: Parameter 'product' implicitly has an 'any' type.
//ERROR in D:/WORKSPACES/JHIPSTER/Applicationpanier/src/main/webapp/app/entities/cart.service.ts(13,21):
//TS2345: Argument of type 'any' is not assignable to parameter of type 'never'.
