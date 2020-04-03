import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ApplicationpanierSharedModule } from 'app/shared/shared.module';
import { ProductdetailsComponent } from './productdetails.component';
import { ProductdetailsDetailComponent } from './productdetails-detail.component';
import { ProductdetailsUpdateComponent } from './productdetails-update.component';
import { ProductdetailsDeleteDialogComponent } from './productdetails-delete-dialog.component';
import { productdetailsRoute } from './productdetails.route';

@NgModule({
  imports: [ApplicationpanierSharedModule, RouterModule.forChild(productdetailsRoute)],
  declarations: [
    ProductdetailsComponent,
    ProductdetailsDetailComponent,
    ProductdetailsUpdateComponent,
    ProductdetailsDeleteDialogComponent
  ],
  entryComponents: [ProductdetailsDeleteDialogComponent]
})
export class ApplicationpanierProductdetailsModule {}
