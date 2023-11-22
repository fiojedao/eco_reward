import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  userList: any[] = [];
  userLogin: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  showFiller = false;

  constructor(
    public dialog: MatDialog,
    private gService: GenericService,
    private userService: UserService) {
      this.loadAllUsers();
      this.loadUser();
  }

  ngAfterViewInit(): void {
    this.loadAllUsers();
    this.loadUser();
  }

  loadAllUsers(){
    this.gService
      .list('user/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        this.userList = response;
      });
      this.loadUser();
  }

  getUserDetails(user: any) {
    if(user){
      if(user.role === 1 || user.role === 3){
        this.userService.setUser(user, undefined);
      } else {
        this.gService
          .list(`center/user/${user.userID}`)
          .pipe(takeUntil(this.destroy$))
          .subscribe((center: any) => {
            this.userService.setUser(user, center);
        });
      }
    }
    this.loadUser();
  }

  loadUser(){
    this.userLogin = this.userService.getInfo();
  }
}
