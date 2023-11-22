import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { navItems } from './sidebar-data';
import { NavService } from '../../services/nav.service';
import { UserService } from 'src/app/services/user.service';
import { Subject } from 'rxjs';

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
    private cdr: ChangeDetectorRef
  ) {
    this.loadUser();
  }

  loadUser(){
    this.filterNavItem(this.userService.getInfo());
  }

  ngOnInit(): void {
    this.userService.userChanges().subscribe((data) => {
      this.filterNavItem(data.user);
    });
  }

  filterNavItem(user: any){
    if(user && user.role && user.role == 1){
      this.navItems = navItems;
    } else {
      this.navItems = navItems.filter((u:any) => u.route !== "home/user");
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
