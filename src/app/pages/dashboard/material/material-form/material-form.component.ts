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
  selector: 'app-material-form',
  templateUrl: './material-form.component.html',
  styleUrls: ['./material-form.component.css'],
})
export class MaterialFormComponent {
  destroy$: Subject<boolean> = new Subject<boolean>();
  titleForm: string = 'New Material';
  materialInfo: any;
  //Respuesta del API crear/modificar
  respMaterial: any;

  //Sí es submit
  submitted = false;
  isCreate: boolean = true;
  idMaterial: number = 0;
  materialForm!: FormGroup;

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
      this.idMaterial = params['id'];

      if (this.idMaterial != undefined && !isNaN(Number(this.idMaterial))) {
        this.isCreate = false;
        this.titleForm = 'Update Material';

        this.gService
          .get('material', this.idMaterial)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.materialInfo = data;
            console.log(this.materialInfo);

            //Precargar los datos en el formulario
            this.materialForm.patchValue({
              id: this.materialInfo.materialID,
              name: this.materialInfo.name,
              description: this.materialInfo.description,
              /* image: this.materialInfo.image, */
              unit_of_measure: this.materialInfo.unit_of_measure,
              price: this.materialInfo.price,
              color_representation: this.materialInfo.color_representation,
            });
          });
      }
    });
  }

  formularioReactive() {
    //[null, Validators.required]
    this.materialForm = this.fb.group({
      id: [null, null],
      name: [
        null,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      description: [null, Validators.required],
      image: [null, Validators.compose([Validators.required])],
      unit_of_measure: [null, Validators.compose([Validators.required])],
      price: [null, Validators.compose([Validators.required])],
      color_representation: [null, Validators.compose([Validators.required])],
    });
  }

  public errorHandling = (control: string, error: string) => {
    return this.materialForm.controls[control].hasError(error);
  };
  submitMaterial(): void {
    this.submitted = true;
    if (this.materialForm.invalid) return;

    if (this.isCreate) {
      this.gService
        .create('material', this.materialForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          this.respMaterial = data;
          this.noti.mensajeRedirect(
            'Create material',
            `Materal: ${data.name} created successfully`,
            TipoMessage.success,
            'home/material/'
          );
          console.log(data);
          this.router.navigate(['home/material/']);
        });
    } else {
      if (this.idMaterial != undefined && !isNaN(Number(this.idMaterial))) {
        this.gService
          .update('material', this.materialForm.value)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            //Obtener respuesta
            debugger;
            this.respMaterial = data;
            this.noti.mensajeRedirect(
              'Update material',
              `Material: ${data.name} updated successfully`,
              TipoMessage.success,
              'home/material/'
            );
            console.log(data);
            this.router.navigate(['home/material/']);
          });
      }
    }
  }

  onReset() {
    this.submitted = false;
    this.materialForm.reset();
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
