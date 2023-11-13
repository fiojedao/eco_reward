import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialExchangeAllComponent } from './material-exchange-all/material-exchange-all.component';

const routes: Routes = [
  {
    path: 'material-exchange',
    component: MaterialExchangeAllComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterialExchangeRoutingModule {}
