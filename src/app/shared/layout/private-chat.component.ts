import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ChatService } from '../../core/services/chat.service';
import { User} from '../../core/models/user.model';
import { ApiService } from '../../core/services/api.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.css']
})
export class PrivateChatComponent implements OnInit {
  @Input() User;
  msg: string;
  searchForm: FormGroup;
  msgForm: FormGroup;
  show = false;
  me: User;

  constructor(
    private fb: FormBuilder,
    private _chatService: ChatService,
    private http: ApiService,
    private userService: UserService,
  ) {
    this.msgForm = this.fb.group({
      message: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.me = this.userService.getCurrentUser();
  }

  envoyer(destinataire) {
    console.log(this.msgForm.value.message + 'à envoyer à' + destinataire);
  }
}
