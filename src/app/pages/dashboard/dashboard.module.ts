// dashboard/dashboard.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { CoreModule } from 'src/app/core/core.module';
import { DashTemplateComponent } from 'src/app/core/dash-template/dash-template.component';

@NgModule({
  declarations: [InicioComponent],
  imports: [CommonModule, DashboardRoutingModule, CoreModule],
})
export class DashboardModule {}
