import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ApplicationpanierSharedModule } from 'app/shared/shared.module';
import { TopbarComponent } from './topbar.component';
import { TopbarDetailComponent } from './topbar-detail.component';
import { TopbarUpdateComponent } from './topbar-update.component';
import { TopbarDeleteDialogComponent } from './topbar-delete-dialog.component';
import { topbarRoute } from './topbar.route';

@NgModule({
  imports: [ApplicationpanierSharedModule, RouterModule.forChild(topbarRoute)],
  declarations: [TopbarComponent, TopbarDetailComponent, TopbarUpdateComponent, TopbarDeleteDialogComponent],
  entryComponents: [TopbarDeleteDialogComponent]
})
export class ApplicationpanierTopbarModule {}
