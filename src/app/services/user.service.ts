// user.service.ts
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { SelectedUser } from '../../models/SelectUser'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private selectedUser: SelectedUser = {
    user: undefined,
    center: undefined,
    isSuperAdmin: false,
    isCenterAdmin: false,
    isClient: false,
  };
  private localStorageKey = 'userInfo';
  private userChangeSubject = new Subject<any>();

  setUser(user: any, center: any) {
    this.selectedUser.user = user;
    this.selectedUser.center = center;
    this.selectedUser.isSuperAdmin = user?.role === 1;
    this.selectedUser.isCenterAdmin = user?.role === 2;
    this.selectedUser.isClient = user?.role === 3;
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.selectedUser));
    this.userChangeSubject.next(this.selectedUser);
  }

  getInfo(): any {
    const storedUser = localStorage.getItem(this.localStorageKey);
    return storedUser ? JSON.parse(storedUser) : null;
  }

  userChanges(): Observable<any> {
    return this.userChangeSubject.asObservable();
  }
}
