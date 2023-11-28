import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { navItems } from './sidebar-data';
import { NavService } from '../../services/nav.service';
import { UserService } from 'src/app/services/user.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  datos: any; //respuesta del API
  destroy$: Subject<boolean> = new Subject<boolean>();
  navItems: any;

  constructor(
    public navService: NavService,
    private userService: UserService,
    private router: Router
  ) {
    this.loadUser();
  }

  loadUser() {
    this.filterNavItem(this.userService.getInfo());
  }

  ngOnInit(): void {
    this.userService.userChanges().subscribe((data) => {
      this.filterNavItem(data);
    });
  }

  filterNavItem(data: any) {
    if(data){
      const { user, center, isSuperAdmin, isCenterAdmin, isClient } = data;
      var items: any[] = navItems;
      debugger
      if (user) {
        if (isSuperAdmin) {
          this.navItems = navItems;
        } else if (center && isCenterAdmin) {
          var items: any[] = navItems;
          items.map((item: any) => {
            if (item.route === 'home/center') {
              item.route = `home/center/${center.centerID}`;
            }
          });
          this.navItems = items.filter((u: any) => u.route !== 'home/user');
        } else if(isClient){
          var items: any[] = navItems;
          this.navItems = items.filter(item => {
            return (
              item.navCap === 'Inicio' ||
              item.displayName === 'Dashboard' ||
              item.navCap === 'Mantenimientos' ||
              item.displayName === 'Historial de Canje' ||
              item.navCap === 'Autenticación' ||
              item.displayName === 'Login' ||
              item.displayName === 'Registro'
            );
          });
        } else {
          this.navItems = [];
        }
      }
      this.router.navigate(['home']);
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
