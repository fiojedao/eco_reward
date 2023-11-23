import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-material-management',
  templateUrl: './material-management.component.html',
  styleUrls: ['./material-management.component.css'],
})
export class MaterialManagementComponent {
  userList: any[] = [];
  userLogin: any;
  userSelected: any;
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
  ) {
    this.loadAllUsers();
  }

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
              this.center = response;
              debugger;
            });
          console.log(this.center);
        } else {
          this.router.navigate(['home']);
        }
      }
    });
  }

  loadAllUsers() {
    this.gService
      .list('user/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        this.userList = response;
      });
  }

  getUserDetails(user: any) {
    debugger;
    if (user) {
      this.userSelected = user;
    }
    this.loadUser();
  }

  loadUser() {
    this.userLogin = this.userService.getInfo();
  }
}
