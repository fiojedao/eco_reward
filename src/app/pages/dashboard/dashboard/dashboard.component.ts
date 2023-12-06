import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userRole: string = "";
  ecoCoins: any = {};
  centroAcopio: any = {};
  estadisticas: any = {};
  adminEstadisticas: any = {};

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUserRole();
  }

  getUserRole() {
    this.userService.getUser.subscribe((user: any) => {
      if (user) {
        if (user.isSuperAdmin) {
          this.userRole = 'Super Admin';
          this.loadSuperAdminDashboard(user);
        } else if (user.isCenterAdmin) {
          this.userRole = 'Center Admin';
          this.loadCenterAdminDashboard(user);
        } else if (user.isClient) {
          this.userRole = 'Client';
          this.loadClientDashboard(user);
        }
      }
    });
  }

  loadSuperAdminDashboard(user: any) {
    // Lógica para cargar el dashboard del Super Admin
    // ...
  }

  loadCenterAdminDashboard(user: any) {
    // Lógica para cargar el dashboard del Center Admin
    // ...
  }

  loadClientDashboard(user: any) {
    // Lógica para cargar el dashboard del Client
    // ...
  }
}
