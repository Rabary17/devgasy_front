import { Component, OnInit, ElementRef, HostListener, Output; EventEmitter, Input } from '@angular/core';
import { ChatService } from '../../core/services/chat.service';
import { WebsocketService } from '../../core/services/websocket.service';
import { User} from '../../core/models/user.model';
import { ApiService } from '../../core/services/api.service';
import { UserService } from '../../core/services/user.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import * as io from 'socket.io-client';
import { UrlResolver } from '@angular/compiler';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-chat-component',
  templateUrl: './chat.component.html'
})

export class ChatComponent implements OnInit   {

    allConnectedUser: Array<any>;
    allMessage: Array<any>;
    show = false;
    showUser = '';
    currentUserId = '';

    private socket = io.connect('http://localhost:3000');

    @HostListener('document: click', ['$event'])
    public clickout(event) {
      const clickedInside = this.eRef.nativeElement.contains(event.target);
      if (!clickedInside) {
          this.show = false;
      }
    }

    constructor(
        private _chatService: ChatService,
        private http: ApiService,
        private userService: UserService,
        private wsService: WebsocketService,
        private eRef: ElementRef
      ) {
        this.allMessage = [];
      }

      ngOnInit() {
        this.currentUserId = this.userService.getCurrentUser().id;
        // this.getAllConnectedUser().subscribe(res => {
        //     this.allConnectedUser = res;
        //     console.log(res);
        //   });
        // this.wsService.connect().map( res => {
        //   alert(res);
        // });


        this._chatService.messages.subscribe(mes => {
          if (mes.tag === 'mp') {
            const message = this.addDate(mes);
            this.allMessage.push(message);
            console.log('this.allMessage ' + JSON.stringify(this.allMessage));
          }
          if (mes.tag === 'listUserConnected') {
            this.allConnectedUser = mes.users;
            console.log('allConnectedUser ' + JSON.stringify(this.allConnectedUser));
          }
          if (mes.tag === 'notifUserConnected') {
            alert('notifUserConnected ' + JSON.stringify(mes));
          }
          if (mes.tag === 'welcomeMessage') {
            alert('welcomeMessage ' + JSON.stringify(mes));
          }
        });
    }

    addDate (mes) {
      const date = new Date();
      return Object.assign(mes, {'date': date});
    }

    hide() {
      this.show = false;
      console.log('click outside');
    }

    showConnectedUser() {
        // this.getAllConnectedUser().subscribe(res => {
        //   this.allConnectedUser = res;
        //   console.log(res);
        // });
        this.currentUserId = this.userService.getCurrentUser().id;
        this.show = !this.show;
      }

      getAllConnectedUser() {
        const msg = 'getAllUserConnected';
        this._chatService.sendMsg(msg);
        const tab = [];
        this.socket.on('listeConnectedUser', function(res) {
          tab.push(res);
        });
        this.allConnectedUser = tab;
      }

      talkTo(user) {
        this.showUser = user.id;
      }
}
