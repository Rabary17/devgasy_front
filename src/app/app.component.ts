import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { UserService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  currentUser = '';
  constructor (
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.userService.populate();
  }
}
