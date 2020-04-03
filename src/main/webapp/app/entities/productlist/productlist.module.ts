import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ApplicationpanierSharedModule } from 'app/shared/shared.module';
import { ProductlistComponent } from './productlist.component';
import { ProductlistDetailComponent } from './productlist-detail.component';
import { ProductlistUpdateComponent } from './productlist-update.component';
import { ProductlistDeleteDialogComponent } from './productlist-delete-dialog.component';
import { productlistRoute } from './productlist.route';

@NgModule({
  imports: [ApplicationpanierSharedModule, RouterModule.forChild(productlistRoute)],
  declarations: [ProductlistComponent, ProductlistDetailComponent, ProductlistUpdateComponent, ProductlistDeleteDialogComponent],
  entryComponents: [ProductlistDeleteDialogComponent]
})
export class ApplicationpanierProductlistModule {}
