import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { CouponAllComponent } from './coupon-all/coupon-all.component';
import { CouponDetailComponent } from './coupon-detail/coupon-detail.component';
import { CouponFormComponent } from './coupon-form/coupon-form.component';
import { MaterialImports } from 'src/app/materialImports.module';
import { ReactiveFormsModule } from '@angular/forms';
/* import {} from '@angular/'; */

@NgModule({
  declarations: [
    CouponAllComponent,
    CouponDetailComponent,
    CouponFormComponent,
  ],
  imports: [CommonModule, MaterialImports, ReactiveFormsModule],
  providers: [DatePipe],
})
export class CouponModule {}