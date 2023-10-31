import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { HomeComponent } from './home/home.component';
import { CoreModule } from 'src/app/core/core.module';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { LandingTemplateComponent } from './landing-template/landing-template.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [HomeComponent, LandingTemplateComponent],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    CoreModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
  ],
})
export class LandingPageModule {}
