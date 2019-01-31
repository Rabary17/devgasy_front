import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../core/services/chat.service';
import { User} from '../../core/models/user.model';
import { ApiService } from '../../core/services/api.service';
import { UserService } from '../../core/services/user.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-chat-component',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit  {
    msg: string;
    allConnectedUser: Array<any>;
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
        // this.getAllConnectedUser();
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
        this.socket.on('listeConnectedUser', function(res) {
          tab.push(res);
        });
        this.allConnectedUser = tab;
      }

      send() {
        this.msg = 'Hello Word for this socket.io tech';
        this._chatService.sendMsg(this.msg);
        console.log('message sent');
      }

      talkTo(user) {
        console.log(user.id);
            this.showUser = user.id;
      }

}
