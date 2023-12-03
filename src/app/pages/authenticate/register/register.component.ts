import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericService } from 'src/app/share/generic.service';
import { Subject, takeUntil } from 'rxjs';
import { NotificacionService, TipoMessage } from 'src/app/share/notificacion.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registroForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private gService: GenericService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private noti: NotificacionService,
    private router: Router) {
    this.registroForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), this.validatePasswordStrength]]
    });
  }

  validatePasswordStrength(control: { value: string }): { [key: string]: boolean } | null {
    const password = control.value;
    const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])');
    if (password && !strongRegex.test(password)) {
      return { 'invalidPassword': true };
    }
    return null;
  }

  onSubmit() {
    if (this.registroForm.valid) {
      const formData = this.registroForm.value;
      this.gService
        .get(`user/validateEmail`, formData.email)
        .pipe(takeUntil(this.destroy$))
        .subscribe((response: any) => {
          if(response){
            this.noti.mensaje(
              'Error al crear el usuario',
              `El correo ${formData.email} ya se encuentra en uso.`,
              TipoMessage.error
            );
          } else{
            this.createUser(formData);
          }
        });
    }
  }

  createUser(formData: any){
    const User = { 
      name: formData.fullName, 
      email: formData.email, 
      password: formData.password, 
      identification: '', 
      phone: '', 
      role: 3 };

    this.gService
      .create(`user`, User)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        if(response && response.userID){
          this.getUserById(response.userID);
          this.noti.mensaje(
            'Cuenta registrada',
            `Se ha creado exitosamente`,
            TipoMessage.success
          );
        } else {
          this.noti.mensaje(
            'Error al crear el usuario',
            `Ha ocurrido un error al momento de crear al usuario: \nPongase en contacto con el Administrador`,
            TipoMessage.error
          );
        }
      });
  }

  getUserById(userID: number){
    this.gService
    .get(`user`, userID)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response: any) => {
      this.userService.setToken(response.token);
      this.userService.setUser(response.user, null);
      this.router.navigate(['home']);
    });
  }
  
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
