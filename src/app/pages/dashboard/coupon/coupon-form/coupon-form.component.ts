import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ImageUploadService } from 'service/image-upload.service';
import { GenericService } from 'src/app/share/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notificacion.service';

@Component({
  selector: 'app-coupon-form',
  templateUrl: './coupon-form.component.html',
  styleUrls: ['./coupon-form.component.css'],
})
export class CouponFormComponent {
  destroy$: Subject<boolean> = new Subject<boolean>();
  titleForm: string = 'New Coupon';
  couponInfo: any;
  file: any;
  fileName: any;
  base64String: string = '';
  //Respuesta del API crear/modificar
  respCoupon: any;

  //Sí es submit
  submitted = false;
  isCreate: boolean = true;
  idCoupon: number = 0;
  couponForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private noti: NotificacionService
  ) {
    this.formularioReactive();
  }

  ngOnInit(): void {
    this.activeRouter.params.subscribe((params: Params) => {
      this.idCoupon = params['id'];

      if (this.idCoupon != undefined && !isNaN(Number(this.idCoupon))) {
        this.isCreate = false;
        this.titleForm = 'Update Center';

        this.gService
          .get('couponexchange', this.idCoupon)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.couponInfo = data;
            let newStart = this.formatDateUpdate(
              this.couponInfo.start_validity_date
            );
            console.log(this.couponInfo);
            //Precargar los datos en el formulario
            debugger;
            this.couponForm.patchValue({
              id: this.couponInfo.couponID,
              name: this.couponInfo.name,
              description: this.couponInfo.description,
              image: this.couponInfo.image,
              category: this.couponInfo.category,
              startValidityDate: this.couponInfo.startValidityDate,
              endValidityDate: this.couponInfo.endValidityDate,
              ecoCoinsRequired: this.couponInfo.eco_coins_required,
            });
          });
      }
    });
  }

  formularioReactive() {
    this.couponForm = this.fb.group({
      id: [null, null],
      name: [
        null,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      description: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(15),
          Validators.maxLength(150),
        ]),
      ],
      image: [null],
      category: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ]),
      ],
      startValidityDate: [null, Validators.compose([Validators.required])],
      endValidityDate: [null, Validators.compose([Validators.required])],
      ecoCoinsRequired: [null, Validators.compose([Validators.required])],
    });
  }

  submitCoupon(): void {
    this.submitted = true;
    debugger;

    if (this.couponForm.invalid) return;

    const startValidityDate = this.couponForm.get('startValidityDate')?.value;
    const startFormattedDate = this.formatDateForSubmission(startValidityDate);
    this.couponForm.get('startValidityDate')?.setValue(startFormattedDate);

    const endValidityDate = this.couponForm.get('endValidityDate')?.value;
    const endFormattedDate = this.formatDateForSubmission(endValidityDate);
    this.couponForm.get('endValidityDate')?.setValue(endFormattedDate);

    console.log(this.couponForm.value);

    if (this.isCreate) {
      this.gService
        .create('couponexchange', this.couponForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          // Obtener respuesta
          this.respCoupon = data;
          this.noti.mensajeRedirect(
            'Create coupon',
            `Coupon: ${data.name} created successfully`,
            TipoMessage.success,
            'home/coupon/'
          );
          console.log(data);
          this.router.navigate(['home/coupon/']);
        });
    } else {
      if (this.idCoupon != undefined && !isNaN(Number(this.idCoupon))) {
        debugger;
        this.gService
          .update('center', this.couponForm.value)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            //Obtener respuesta
            this.respCoupon = data;
            this.noti.mensajeRedirect(
              'Update coupon',
              `Coupon: ${data.name} updated successfully`,
              TipoMessage.success,
              'home/coupon/'
            );
            console.log(data);
            this.router.navigate(['home/coupon/']);
          });
      }
    }
  }

  // Función para formatear la fecha en el formato deseado
  formatDateForSubmission(dateString: string): string {
    debugger;
    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toISOString(); // Formato: "2023-01-01T00:00:00.000Z"
    return formattedDate;
  }

  onReset() {
    this.submitted = false;
    this.couponForm.reset();
  }

  formatDateUpdate(inputDate: string): string {
    const dateObject = new Date(inputDate);
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');
    const year = dateObject.getFullYear().toString();

    return `${month}/${day}/${year}`;
  }

  onBack() {
    this.router.navigate(['/home/material']);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}
