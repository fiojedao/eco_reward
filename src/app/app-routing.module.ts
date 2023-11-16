import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from './core/core.module';
import { UserAllComponent } from './pages/dashboard/user/user-all/user-all.component';
import { DashTemplateComponent } from './core/dash-template/dash-template.component';
import { LandingTemplateComponent } from './pages/landing-page/landing-template/landing-template.component';
import { HomeComponent } from './pages/landing-page/home/home.component';
import { CenterAllComponent } from './pages/dashboard/center/center-all/center-all.component';
import { CenterDetailComponent } from './pages/dashboard/center/center-detail/center-detail.component';
import { CenterFormComponent } from './pages/dashboard/center/center-form/center-form.component';
import { UserDetailComponent } from './pages/dashboard/user/user-detail/user-detail.component';
import { UserCouponComponent } from './pages/dashboard/user/user-coupon/user-coupon.component';
import { ExchangeAllComponent } from './pages/dashboard/material/exchange/exchange-all/exchange-all.component';
import { MaterialAllComponent } from './pages/dashboard/material/material-all/material-all.component';
import { MaterialFormComponent } from './pages/dashboard/material/material-form/material-form.component';
import { MaterialDetailComponent } from './pages/dashboard/material/material-detail/material-detail.component';
import { ExchangeDetailComponent } from './pages/dashboard/material/exchange/exchange-detail/exchange-detail.component';
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
        path: 'user/:id',
        component: UserDetailComponent,
      },
      {
        path: 'user/1/coupon',
        component: UserCouponComponent,
      },
      {
        path: 'center',
        component: CenterAllComponent,
      },
      {
        path: 'center/create',
        component: CenterFormComponent,
      },
      {
        path: 'center/update/:id',
        component: CenterFormComponent,
      },
      {
        path: 'center/:id',
        component: CenterDetailComponent,
      },
      {
        path: 'material-exchange',
        component: ExchangeAllComponent,
      },
      {
        path: 'material-exchange/:id',
        component: ExchangeDetailComponent,
      },
      {
        path: 'material',
        component: MaterialAllComponent,
      },
      {
        path: 'material/:id',
        component: MaterialDetailComponent,
      },
      {
        path: 'material/create',
        component: MaterialFormComponent,
      },
      {
        path: 'material/update/:id',
        component: MaterialFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CoreModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
