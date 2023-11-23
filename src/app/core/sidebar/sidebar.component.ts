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

  filterNavItem(data: any){
    const { user, center, isSuperAdmin, isCenterAdmin } = data;
    if(user){
      if(isSuperAdmin){
        this.navItems = navItems;
      } else if(center && isCenterAdmin){
        var items: any[] = [];
        navItems.map((u:any)=>{
          var item = u;
          if(item.route === 'home/center'){
            item.route = `home/center/${center.centerID}`
            items.push(item);
          } else {
            items.push(item);
          }
        })
        this.navItems = items;
      } else {
        this.navItems = navItems.filter((u:any) => u.route !== "home/user");
      }
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
