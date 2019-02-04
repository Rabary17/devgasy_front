import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ChatService } from '../../core/services/chat.service';
import { User} from '../../core/models/user.model';
import { ApiService } from '../../core/services/api.service';
import { UserService } from '../../core/services/user.service';
import { MessageService } from '../../core/services/message.service';
import * as io from 'socket.io-client';
import {WebsocketService } from '../../core/services/websocket.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.css']
})
export class PrivateChatComponent implements OnInit {
  @Input() User;
  @Input() Messages;
  msg: string;
  searchForm: FormGroup;
  msgForm: FormGroup;
  show = false;
  myid: User;

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

  envoyer(destinataire) {
    this.myid = this.userService.getCurrentUser();
    const params = {'idEnvoyeur': this.myid.id,
                    'idReceveur': destinataire,
                    'message': this.msgForm.value.message,
                    'tag': 'mp'};
                    console.log('nouvelle émission de données pour' + destinataire);

    return this.chatService.sendMsg(params);
    // return this.messageService.new(params).subscribe(res => {
    //   console.log(res);
    // });
  }
}
