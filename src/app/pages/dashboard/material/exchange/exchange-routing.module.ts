import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangeAllComponent } from './exchange-all/exchange-all.component';

const routes: Routes = [
  {
    path: 'material-exchange',
    component: ExchangeAllComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExchangeRoutingModule {}
