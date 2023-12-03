import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent {
  userData: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  
  constructor(
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    let id = this.route.snapshot.paramMap.get('id');
    if (!isNaN(Number(id))) {
      this.getUser(Number(id));
    }
  }
  
  getUser(id: any) {
    this.gService
      .get('user', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.userData = data.user;
      });
  }

  updateUser(userForm: NgForm) {
    if (userForm.valid) {
      // Realiza la lógica para actualizar al usuario
      console.log('Formulario válido. Actualizar usuario:', this.userData.user);
      // Por ejemplo, podrías hacer una petición HTTP al backend para actualizar los datos.
    } else {
      console.log('Formulario inválido. Verifica los campos.');
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
