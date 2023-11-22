import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';
import { ImageUploadService } from '../../../../../../service/image-upload.service';
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
  file: any;
  fileName: any;
  base64String: string = "";
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
    private noti: NotificacionService,
    private imageUploadService: ImageUploadService
  ) {
    this.formularioReactive();
  }

  ngOnInit(): void {
    this.activeRouter.params.subscribe((params: Params) => {
      this.idMaterial = params['id'];

      if (this.idMaterial > 0 && this.idMaterial != undefined) {
        this.isCreate = false;
        this.titleForm = 'Update Material';

        this.gService
          .get('material', this.idMaterial)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.materialInfo = data;
            console.log(this.materialInfo);
            this.base64String = this.materialInfo.image;
            //Precargar los datos en el formulario
            this.materialForm.patchValue({
              id: this.materialInfo.materialID,
              name: this.materialInfo.name,
              description: this.materialInfo.description,
              image: this.materialInfo.image,
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
      description: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(15),
          Validators.maxLength(150),
        ]),
      ],
      image: [null],
      unit_of_measure: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ]),
      ],
      price: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[0-9]+$/), // Acepta números con hasta dos decimales
          Validators.min(0), // Asegura que el valor sea positivo o cero
        ]),
      ],
      color_representation: [null, Validators.compose([Validators.required])],
    });
  }

  handleFileInput(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      this.imageUploadService.uploadImage(file).subscribe(
        (response: any) => {
          console.log(response);
        },
        (error) => {
          console.error('Error al subir la imagen:', error);
        }
      );
    }
  }

  convertToBase64(file: File): void {
    const reader = new FileReader();

    reader.onload = async (e: any) => {
      // 'e.target.result' contiene la cadena Base64
      this.base64String = e.target.result;
      console.log(this.base64String);
    };

    // Lee el archivo como una URL de datos (cadena Base64)
    reader.readAsDataURL(file);
  }

  public errorHandling = (control: string, error: string) => {
    return this.materialForm.controls[control].hasError(error);
  };
  submitMaterial(): void {
    this.submitted = true;
    console.log(this.materialForm.value);
    if (this.materialForm.invalid) return;
    if (this.isCreate) {
      /* this.gService
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
        }); */
    } else {
      if (this.idMaterial != undefined && !isNaN(Number(this.idMaterial))) {
        /*   this.gService
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
          }); */
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
