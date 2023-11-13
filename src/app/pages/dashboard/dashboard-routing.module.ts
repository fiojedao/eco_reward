import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  /*   {
    path: 'dashboard',
    component: InicioComponent,
    children: [
      {
        path: 'user',
        loadChildren: () =>
          import('./user/user-routing.module').then((m) => m.UserRoutingModule),
      },
      {
        path: 'center',
        loadChildren: () =>
          import('./center/center-routing.module').then(
            (m) => m.CenterRoutingModule
          ),
      },
      {
        path: 'material-exchange',
        loadChildren: () =>
          import('./material-exchange/material-exchange-routing.module').then(
            (m) => m.MaterialExchangeRoutingModule
          ),
      },
    ],
  }, */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
