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
  customers: any[] = [];
  centerAdmin: any[] = [];
  userLogin: any;
  selectedCustomer: any;
  fecha = new Date();
  isSuperAdmin: boolean = false;
  center: any;
  datos: any; //respuesta del API
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private gService: GenericService,
    private router: Router,
    private userService: UserService
  ) {
    this.userLogin = this.userService.getInfo();
    this.loadUser(this.userLogin);
    this.loadCustomers();
    this.loadCenterAdmin();
  }

  loadUser(data: any){
    const { user, center, isSuperAdmin, isCenterAdmin, isClient} = data;
    if (isSuperAdmin) {
      this.center = undefined;
      this.selectedCustomer = undefined;
    } else if (isCenterAdmin) {
      if (center) {
        this.center = center;
      } else {
        this.router.navigate(['home']);
      }
    }
  }

  loadCenterAdmin(){
    this.gService
    .list('user/role/2')
    .pipe(takeUntil(this.destroy$))
    .subscribe((response: any) => {
      this.centerAdmin = response;
    });
  }
  loadCustomers() {
    this.gService
      .list('user/role/3')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        this.customers = response;
      });
  }

  setSelectedCenter(user: any) {
    if (user) {
      this.gService
      .get('center/user', user.userID)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.center = data;
      });
    }
  }

  setSelectedCustomer(user: any) {
    if (user) {
      this.selectedCustomer = user;
    }
  }

  ngAfterViewInit() {
    this.userService.userChanges().subscribe((data) => this.loadUser(data));
  }
}
