import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../core/services/chat.service';
import { User} from '../../core/models/user.model';
import { ApiService } from '../../core/services/api.service';
import { UserService } from '../../core/services/user.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-chat-component',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit  {
    msg: string;
    allConnectedUser: [User];
    searchForm: FormGroup;
    msgForm: FormGroup;
    show = false;
    showUser = '';

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
        this.getAllConnectedUser().subscribe(res => {
            this.allConnectedUser = res;
            console.log(res);
          });
    }

    showConnected() {
        this.getAllConnectedUser().subscribe(res => {
          this.allConnectedUser = res;
          console.log(res);
        });
        this.show = !this.show;
      }

      getAllConnectedUser() {
        return this.userService.getConnectedUser();
      }

      send() {
        this.msg = 'Hello Word for this socket.io tech';
        this._chatService.sendMessage(this.msg);
        console.log('message sent');
      }

      talkTo(user) {
        console.log(user.id);
            this.showUser = user.id;
      }

}
