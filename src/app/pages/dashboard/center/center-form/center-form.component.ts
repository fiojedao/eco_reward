import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notificacion.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-center-form',
  templateUrl: './center-form.component.html',
  styleUrls: ['./center-form.component.css'],
})
export class CenterFormComponent {
  destroy$: Subject<boolean> = new Subject<boolean>();
  titleForm: string = 'New Center';
  //Center to update
  centerInfo: any;
  administratorList: any;
  acceptedMaterialList: any;
  //Respuesta del API crear/modificar
  respCenter: any;

  //Sí es submit
  submitted = false;
  isCreate: boolean = true;
  idCenter: number = 0;
  centerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private noti: NotificacionService
  ) {
    this.getAdministratorList();
    this.getAcceptedMaterialList();
    this.formularioReactive();
  }

  ngOnInit(): void {
    this.activeRouter.params.subscribe((params: Params) => {
      this.idCenter = params['id'];

      if (this.idCenter != undefined && !isNaN(Number(this.idCenter))) {
        this.isCreate = false;
        this.titleForm = 'Update Center';

        this.gService
          .get('center', this.idCenter)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.centerInfo = data;
            console.log(this.centerInfo);
            //Precargar los datos en el formulario
            this.centerForm.patchValue({
              id: this.centerInfo.id,
              name: this.centerInfo.name,
              province: this.centerInfo.Address.province,
              canton: this.centerInfo.Address.canton,
              district: this.centerInfo.Address.district,
              exact_address: this.centerInfo.Address.exact_address,
              phone: this.centerInfo.phone,
              operating_hours: this.centerInfo.operating_hours,
              administrator_userID: this.centerInfo.administrator_userID,
              accepted_materials: this.centerInfo.Center_Material.map(
                ({ materialID }: { materialID: number }) => materialID
              ),
            });
          });
      }
    });
  }

  getAdministratorList() {
    this.administratorList = null;
    this.gService
      .list('user/administrators')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.administratorList = data;
      });
  }

  getAcceptedMaterialList() {
    this.acceptedMaterialList = null;
    this.gService
      .list('center/material')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.acceptedMaterialList = data;
      });
  }

  formularioReactive() {
    //[null, Validators.required]
    this.centerForm = this.fb.group({
      id: [null, null],
      name: [
        null,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      province: [null, Validators.required],
      canton: [null, Validators.compose([Validators.required])],
      district: [null, Validators.compose([Validators.required])],
      exact_address: [null, Validators.compose([Validators.required])],
      phone: [null, Validators.compose([Validators.required])],
      operating_hours: [null, Validators.compose([Validators.required])],
      administrator_userID: [null, Validators.required],
      accepted_materials: [null, Validators.required],
    });
  }

  public errorHandling = (control: string, error: string) => {
    return this.centerForm.controls[control].hasError(error);
  };
  submitVideojuego(): void {
    this.submitted = true;
    if (this.centerForm.invalid) return;

    /* ajustar de [1, 3] a [{materialID: 1}, {materialID: 3}] */
    let materialFormat: any =
      this.centerForm
        ?.get('accepted_materials')
        ?.value?.map((x: any) => ({ ['materialID']: x })) ?? [];

    this.centerForm.patchValue({ accepted_materials: materialFormat });
    console.log(this.centerForm.value);

    if (this.isCreate) {
      this.gService
        .create('center', this.centerForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          this.respCenter = data;
          this.noti.mensajeRedirect(
            'Create center',
            `Center: ${data.name} created successfully`,
            TipoMessage.success,
            'home/center/'
          );
          console.log(data);
          this.router.navigate(['home/center/']);
        });
    }
  }

  onBack() {
    this.router.navigate(['/home/center']);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}
