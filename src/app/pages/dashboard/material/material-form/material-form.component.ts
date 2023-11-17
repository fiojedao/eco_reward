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
    private noti: NotificacionService
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
      description: [null, Validators.required],
      image: [null, Validators.compose([Validators.required])],
      fileName: [null, Validators.compose([Validators.required])],
      unit_of_measure: [null, Validators.compose([Validators.required])],
      price: [null, Validators.compose([Validators.required])],
      color_representation: [null, Validators.compose([Validators.required])],
    });
  }

  handleFileInput(event: any): void {
  const file = event.target.files[0];
    if (file) {
      this.materialForm.get('fileName')?.setValue(file.name);
      this.file = file;
      this.convertToBase64(file);
    }
  }

  convertToBase64(file: File, quality: number = 0.7): Promise<void> {
    return new Promise<void>((resolve) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx: any = canvas.getContext('2d');
  
          // Configurar el tamaño del lienzo para la imagen reducida
          canvas.width = img.width;
          canvas.height = img.height;
  
          // Dibujar la imagen en el lienzo
          ctx.drawImage(img, 0, 0);
  
          // Obtener la cadena Base64 del lienzo con calidad reducida
          const base64String = canvas.toDataURL('image/jpeg', quality);
  
          // Almacenar la cadena Base64
          this.base64String = base64String;
          console.log(this.base64String);
  
          resolve();
        };
  
        // Cargar la imagen para obtener sus dimensiones
        img.src = e.target.result;
      };
  
      // Leer el archivo como una URL de datos (cadena Base64)
      reader.readAsDataURL(file);
    });
  }
  

  public errorHandling = (control: string, error: string) => {
    return this.materialForm.controls[control].hasError(error);
  };
  submitMaterial(): void {
    this.submitted = true;
  
    if (this.materialForm.invalid) {
      return;
    }
  
    var materialData = this.materialForm.value;
    materialData.image = this.base64String;
    if (this.idMaterial != undefined && !isNaN(Number(this.idMaterial))) {
      // Actualización de material
      this.gService
        .update('material', materialData)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data: any) => {
            this.respMaterial = data;
            this.noti.mensajeRedirect(
              'Update material',
              `Material: ${data.name} updated successfully`,
              TipoMessage.success,
              'home/material/'
            );
            console.log(data);
            this.router.navigate(['home/material/']);
          },
          (error) => {
            console.error('Error updating material:', error);
            // Puedes mostrar un mensaje de error o realizar acciones específicas en caso de error.
          }
        );
    } else {
      // Creación de material
      this.gService
        .create('material', materialData)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data: any) => {
            this.respMaterial = data;
            this.noti.mensajeRedirect(
              'Create material',
              `Material: ${data.name} created successfully`,
              TipoMessage.success,
              'home/material/'
            );
            console.log(data);
            this.router.navigate(['home/material/']);
          },
          (error) => {
            console.error('Error creating material:', error);
            // Puedes mostrar un mensaje de error o realizar acciones específicas en caso de error.
          }
        );
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
