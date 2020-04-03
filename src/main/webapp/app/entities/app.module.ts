import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopbarComponent } from './topbar/topbar.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { ProductalertsComponent } from './productalerts/productalerts.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { CartService } from './cart.service';
import { CartComponent } from './cart/cart.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ProductlistComponent },
      { path: 'products/:productId', component: ProductdetailsComponent },
      { path: 'cart', component: CartComponent },
    ])
  ],
  declarations: [
    AppComponent,
    TopbarComponent,
    ProductlistComponent,
    ProductalertsComponent,
    ProductdetailsComponent,
    CartComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [CartService]
})
export class AppModule { }
