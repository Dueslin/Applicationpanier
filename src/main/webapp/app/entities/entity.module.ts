import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.ApplicationpanierProductModule)
      },
      {
        path: 'product-category',
        loadChildren: () => import('./product-category/product-category.module').then(m => m.ApplicationpanierProductCategoryModule)
      },
      {
        path: 'customer',
        loadChildren: () => import('./customer/customer.module').then(m => m.ApplicationpanierCustomerModule)
      },
      {
        path: 'product-order',
        loadChildren: () => import('./product-order/product-order.module').then(m => m.ApplicationpanierProductOrderModule)
      },
      {
        path: 'order-item',
        loadChildren: () => import('./order-item/order-item.module').then(m => m.ApplicationpanierOrderItemModule)
      },
      {
        path: 'invoice',
        loadChildren: () => import('./invoice/invoice.module').then(m => m.ApplicationpanierInvoiceModule)
      },
      {
        path: 'shipment',
        loadChildren: () => import('./shipment/shipment.module').then(m => m.ApplicationpanierShipmentModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('./cart/cart.module').then(m => m.ApplicationpanierCartModule)
      },
      {
        path: 'productalerts',
        loadChildren: () => import('./productalerts/productalerts.module').then(m => m.ApplicationpanierProductalertsModule)
      },
      {
        path: 'productdetails',
        loadChildren: () => import('./productdetails/productdetails.module').then(m => m.ApplicationpanierProductdetailsModule)
      },
      {
        path: 'productlist',
        loadChildren: () => import('./productlist/productlist.module').then(m => m.ApplicationpanierProductlistModule)
      },
      {
        path: 'topbar',
        loadChildren: () => import('./topbar/topbar.module').then(m => m.ApplicationpanierTopbarModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class ApplicationpanierEntityModule {}
