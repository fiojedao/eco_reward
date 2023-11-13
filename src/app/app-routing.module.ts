import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from './core/core.module';
import { UserAllComponent } from './pages/dashboard/user/user-all/user-all.component';
import { DashTemplateComponent } from './core/dash-template/dash-template.component';
import { LandingTemplateComponent } from './pages/landing-page/landing-template/landing-template.component';
import { HomeComponent } from './pages/landing-page/home/home.component';
import { CenterAllComponent } from './pages/dashboard/center/center-all/center-all.component';
import { MaterialExchangeAllComponent } from './pages/dashboard/material-exchange/material-exchange-all/material-exchange-all.component';
const routes: Routes = [
  {
    path: '',
    component: LandingTemplateComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'about',
        component: HomeComponent,
      },
    ],
  },
  {
    path: 'home',
    component: DashTemplateComponent,
    children: [
      {
        path: 'user',
        component: UserAllComponent,
      },
      {
        path: 'center',
        component: CenterAllComponent,
      },
      {
        path: 'material-exchange',
        component: MaterialExchangeAllComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CoreModule],
  exports: [RouterModule],
})
export class AppRoutingModule { }
