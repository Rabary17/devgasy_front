import { Component, OnInit } from '@angular/core';

import { User, UserService } from '../../core';
import { Router } from '@angular/router';
import { ChatService } from '../../core/services/chat.service';
import * as io from 'socket.io-client';
@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  private socket = io.connect('http://localhost:3000', {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax : 5000,
    reconnectionAttempts: Infinity
  });
  constructor(
    private userService: UserService,
    private router: Router,
    private chatService: ChatService
  ) {}

  currentUser: User;
  ifAdmin = false;
  msg: string;

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

  seDeconnecter() {
    const msg = {'message': 'disconnect',
                 'idUser': this.currentUser.id
                };
    this.chatService.sendMsg(msg);
    // console.log('this.currentUser.id' + this.currentUser.id);
    this.userService.disconnect(this.currentUser.id).subscribe(res => {
      console.log(res);
    });
    // this.msg = 'deconnect';
    // this.chatService.disconnect(this.msg);
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }
}
