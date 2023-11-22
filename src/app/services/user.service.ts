// user.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private selectedUser: {
    user: any,
    center: any,
    isSuperAdmin: boolean,
    isCenterAdmin: boolean,
    isClient: boolean
  } = {
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
    this.selectedUser.isSuperAdmin = user && user.role && user.role === 1;
    this.selectedUser.isCenterAdmin = user && user.role && user.role === 2;
    this.selectedUser.isClient = user && user.role && user.role === 3;
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.selectedUser));
    this.userChangeSubject.next(this.selectedUser);
  }

  getInfo() {
    const storedUser = localStorage.getItem(this.localStorageKey);
    return storedUser ? JSON.parse(storedUser) : null;
  }

  userChanges() {
    return this.userChangeSubject.asObservable();
  }
}
