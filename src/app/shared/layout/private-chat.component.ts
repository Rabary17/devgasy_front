import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ChatService } from '../../core/services/chat.service';
import { User} from '../../core/models/user.model';
import { ApiService } from '../../core/services/api.service';
import { UserService } from '../../core/services/user.service';
import { MessageService } from '../../core/services/message.service';
import * as io from 'socket.io-client';
import {WebsocketService } from '../../core/services/websocket.service';

@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.css']
})
export class PrivateChatComponent implements OnInit {
  @Input() User;
  @Input() Messages;
  @Input() currentUserId;
  msg: string;
  searchForm: FormGroup;
  msgForm: FormGroup;
  show = false;
  myid: String;

  constructor(
    private fb: FormBuilder,
    private http: ApiService,
    private userService: UserService,
    private messageService: MessageService,
    private websocketService: WebsocketService,
    private chatService: ChatService
  ) {
    this.msgForm = this.fb.group({
      message: ['', Validators.required],
    });
  }

  ngOnInit() {

  }
  addDate (mes) {
    const date = new Date();
    return Object.assign(mes, {'date': date});
  }
  envoyer(destinataire) {
    this.myid = this.userService.getCurrentUser().id;
    const params = {'idEnvoyeur': this.myid,
                    'nomEnvoyeur': this.userService.getCurrentUser().username,
                    'idReceveur': destinataire,
                    'message': this.msgForm.value.message,
                    'tag': 'mp'};
    console.log('message envoyé');
    const msg = this.addDate(params);
    // this.Messages.push(msg);
    this.msgForm.reset();

    this.chatService.sendMsg(msg);
  }
}
