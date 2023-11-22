// user.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  selectedUser: any;

  setSelectedUser(user: any) {
    this.selectedUser = user;
  }

  getSelectedUser() {
    return this.selectedUser;
  }
}
