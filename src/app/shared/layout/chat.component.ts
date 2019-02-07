import { Component, OnInit, OnChanges } from '@angular/core';
import { ChatService } from '../../core/services/chat.service';
import { WebsocketService } from '../../core/services/websocket.service'
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
    msg: string;
    allConnectedUser: Array<any>;
    allMessage: Array<any>;
    searchForm: FormGroup;
    msgForm: FormGroup;
    show = false;
    showUser = '';
    private socket = io.connect('http://localhost:3000');

    constructor(
        private fb: FormBuilder,
        private _chatService: ChatService,
        private http: ApiService,
        private userService: UserService,
        private wsService: WebsocketService
      ) {
        this.msgForm = this.fb.group({
          message: '',
        });
      }

      ngOnInit() {
        // this.getAllConnectedUser().subscribe(res => {
        //     this.allConnectedUser = res;
        //     console.log(res);
        //   });
        // this.wsService.connect().map( res => {
        //   alert(res);
        // });

        this._chatService.messages.subscribe(mes => {
          if (mes.tag === 'mp') {
            console.log('mp ' + JSON.stringify(mes));
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

    showConnected() {
      this.getAllConnectedUser();
        // this.getAllConnectedUser().subscribe(res => {
        //   this.allConnectedUser = res;
        //   console.log(res);
        // });
        this.show = !this.show;
      }

      getAllConnectedUser() {
        const msg = 'getAllUserConnected';
        this._chatService.sendMsg(msg);
        const tab = [];
        const tabMaj = [];
        this.socket.on('listeConnectedUser', function(res) {
          tab.push(res);
        });
        this.allConnectedUser = tab;
      }

      send() {
        this._chatService.sendMsg(this.msg);
      }

      talkTo(user) {
        console.log('id de cet utilisateur ' + user.id);
        const message = [];
            const params = { tag: 'getAllMessageDiscussion',
                             roomId: this.userService.getCurrentUser().id + user.id,
                             userId: this.userService.getCurrentUser().id};
            this.showUser = user.id;
            this._chatService.sendMsg(params);
            this.socket.on('allMessageRoom', function(res, err) {
              res.message.forEach(element => {
                message.push(element);
              });
              // message.push(res.message[0]);
              console.log('room.message' + JSON.stringify(res.message[0]));
            });
            this.allMessage = message;
              console.log('this.allmessage' + message);
      }

}
