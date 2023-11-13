import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CenterAllComponent } from './center-all/center-all.component';
import { CenterDetailComponent } from './center-detail/center-detail.component';
import { CenterFormComponent } from './center-form/center-form.component';

const routes: Routes = [
  /*   {
    path: 'center',
    component: CenterAllComponent,
  },
  {
    path: 'center/:id',
    component: CenterDetailComponent,
  },
  {
    path: 'center/create',
    component: CenterFormComponent,
  }, */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CenterRoutingModule {}
