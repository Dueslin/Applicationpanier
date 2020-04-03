import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ApplicationpanierSharedModule } from 'app/shared/shared.module';
import { ProductalertsComponent } from './productalerts.component';
import { ProductalertsDetailComponent } from './productalerts-detail.component';
import { ProductalertsUpdateComponent } from './productalerts-update.component';
import { ProductalertsDeleteDialogComponent } from './productalerts-delete-dialog.component';
import { productalertsRoute } from './productalerts.route';

@NgModule({
  imports: [ApplicationpanierSharedModule, RouterModule.forChild(productalertsRoute)],
  declarations: [ProductalertsComponent, ProductalertsDetailComponent, ProductalertsUpdateComponent, ProductalertsDeleteDialogComponent],
  entryComponents: [ProductalertsDeleteDialogComponent]
})
export class ApplicationpanierProductalertsModule {}
