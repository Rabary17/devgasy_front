import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent implements OnInit {
  Alluser: [User];

  constructor(
    private user_service: UserService,
  ) { }

  ngOnInit() {
    this.getAllUser();
  }

  getAllUser () {
    this.user_service.getAllUser()
    .subscribe(result => this.Alluser = result);
  }

}
