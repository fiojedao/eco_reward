import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { ShareModule } from './share/share.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

//Import all material modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { ToastrModule } from 'ngx-toastr';
import { CenterModule } from './pages/dashboard/center/center.module';
import { UserModule } from './pages/dashboard/user/user.module';
import { LandingPageModule } from './pages/landing-page/landing-page.module';
import { ExchangeModule } from './pages/dashboard/material/exchange/exchange.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TablerIconsModule.pick(TablerIcons),
    NgScrollbarModule,
    MaterialModule,
    CoreModule,
    ShareModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    CenterModule,
    UserModule,
    LandingPageModule,
    ExchangeModule,
  ],
  exports: [TablerIconsModule],
  bootstrap: [AppComponent],
})

export class AppModule {}
