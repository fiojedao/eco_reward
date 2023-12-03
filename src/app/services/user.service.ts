// user.service.ts
import { Injectable } from '@angular/core';
import { Subject, Observable, EMPTY } from 'rxjs';
import { SelectedUser } from '../../models/SelectUser'
import { jwtDecode } from 'jwt-decode';


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
  private localStorageKeyToken = 'token';
  private userChangeSubject = new Subject<any>();

  setToken(token: string){
    localStorage.setItem(this.localStorageKeyToken, JSON.stringify(token));
    this.userChangeSubject.next(this.selectedUser);
  }

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
    if(this.isTokenValid(this.getToken())){
      return storedUser ? JSON.parse(storedUser) : null;
    } else {
      this.userChangeSubject.next(null);
      return null;
    }
    
  }

  private getToken(): any {
    const storedUser = localStorage.getItem(this.localStorageKeyToken);
    return storedUser ? JSON.parse(storedUser) : null;
  }

  userChanges(): Observable<any> {
    if(this.isTokenValid(this.getToken())){
      return this.userChangeSubject.asObservable();
    } else {
      return EMPTY;
    }
  }

  isTokenValid(token: string): boolean {
    try {
      const decodedToken: any = jwtDecode(token);
      
      const currentTime = Date.now() / 1000;
      return decodedToken.exp > currentTime;
    } catch (error) {
      return false;
    }
  }
}
