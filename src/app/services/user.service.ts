// user.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private selectedUser: any;
  private localStorageKey = 'selectedUser';

  setSelectedUser(user: any) {
    this.selectedUser = user;
    localStorage.setItem(this.localStorageKey, JSON.stringify(user));
  }

  getSelectedUser() {
    const storedUser = localStorage.getItem(this.localStorageKey);
    return storedUser ? JSON.parse(storedUser) : null;
  }
}
