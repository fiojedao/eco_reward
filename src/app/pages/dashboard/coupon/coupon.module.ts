import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { CouponAllComponent } from './coupon-all/coupon-all.component';
import { CouponDetailComponent } from './coupon-detail/coupon-detail.component';
import { CouponFormComponent } from './coupon-form/coupon-form.component';
import { MaterialImports } from 'src/app/materialImports.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogConfirmCouponExchangeComponent } from './dialog-confirm-coupon-exchange/dialog-confirm-coupon-exchange.component';
import { CouponAllClientCouponComponent } from './coupon-all-client-coupon/coupon-all-client-coupon.component';
import { NgxDropzoneModule } from 'ngx-dropzone';

/* import {} from '@angular/'; */

@NgModule({
  declarations: [
    CouponAllComponent,
    CouponDetailComponent,
    CouponFormComponent,
    DialogConfirmCouponExchangeComponent,
    CouponAllClientCouponComponent,
  ],
  imports: [
    CommonModule,
    MaterialImports,
    ReactiveFormsModule,
    NgxDropzoneModule,
  ],
  providers: [DatePipe],
})
export class CouponModule {}
