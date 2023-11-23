import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-exchanging-form',
  templateUrl: './exchanging-form.component.html',
  styleUrls: ['./exchanging-form.component.css'],
})
export class ExchangingFormComponent {
  fecha = new Date();
  isSuperAdmin: boolean = false;
  center: any;
  datos: any; //respuesta del API
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngAfterViewInit() {
    this.userService.userChanges().subscribe((data) => {
      const { user } = data;
      if (user && user.role === 1) {
        this.router.navigate(['home', 'exchanging']);
      } else if (user) {
        if (user) {
          this.gService
            .list(`center/user/2`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((response: any) => {
              this.center = response.centerID;
              debugger;
            });
          console.log(this.center);
        } else {
          this.router.navigate(['home']);
        }
      }
    });

    console.log(this.center);
  }
}
