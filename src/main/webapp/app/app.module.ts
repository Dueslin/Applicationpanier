import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { ApplicationpanierSharedModule } from 'app/shared/shared.module';
import { ApplicationpanierCoreModule } from 'app/core/core.module';
import { ApplicationpanierAppRoutingModule } from './app-routing.module';
import { ApplicationpanierHomeModule } from './home/home.module';
import { ApplicationpanierEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    ApplicationpanierSharedModule,
    ApplicationpanierCoreModule,
    ApplicationpanierHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    ApplicationpanierEntityModule,
    ApplicationpanierAppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent]
})
export class ApplicationpanierAppModule {}
