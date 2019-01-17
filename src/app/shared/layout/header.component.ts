import { Component, OnInit } from '@angular/core';

import { User, UserService } from '../../core';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  constructor(
    private userService: UserService
  ) {}

  currentUser: User;
  ifAdmin = false;

  ngOnInit() {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
        if ( userData.role) {
          userData.role.map(res => {
            if (res === 'ADMIN') {
              this.ifAdmin = true;
            }
          });
        } else {
          this.ifAdmin = false;
        }
      }
    );
  }
}
