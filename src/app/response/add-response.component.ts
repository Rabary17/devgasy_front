import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponsesService } from '../core/services/responses.service';

import { Errors, UserService, User } from '../core';
import { Response } from '../core/models/response.model';
import { Comment } from '../core/models/comment.model';

@Component({
    selector: 'app-add-response',
    templateUrl: './add-response.component.html',
    styleUrls: ['./add-response.component.css']
  })
  export class AddResponseComponent implements OnInit {
    @Input()commentId;
    @Input()commentResp;
    authType: String = '';
    errors: Errors = {errors: {}};
    isSubmitting = false;
    authForm: FormGroup;
    responseControl = new FormControl();
    credentials: Array<any>;
    responses: Response[];
    ifResponse = false;
    isShown = false;
    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private userService: UserService,
      private responseService: ResponsesService,
      private fb: FormBuilder
    ) {
      // use FormBuilresponseServiceder to create a form group
      this.authForm = this.fb.group({
        'body': ['', Validators.required],
      });
    }

    ngOnInit() {
    }

    closeComment() {
      this.isShown = false;
    }

    getResponse() {
      console.log(this.commentId);
      this.responseService.getResponseComment(this.commentId).subscribe(res => {
        this.responses = res;
        this.ifResponse = true;
        this.isShown = true;
      });
    }

    submitForm() {
      this.isSubmitting = true;
      this.errors = {errors: {}};
      const credentials = this.authForm.value;
      const wc = Object.assign(credentials, {'commentId': this.commentId, 'userId': this.userService.getCurrentUser().id});
      this.responseService
      .add(wc)
      .subscribe(
        data => {
          // console.log(data);
          // this.router.navigateByUrl('localhost:4200/article/' + this.authType);
          this.responses.unshift(data);
          this.authForm.reset('');
          this.isSubmitting = false;
        } ,
        err => {
          this.errors = err;
          console.log(err);
          this.isSubmitting = false;
        }
      );
    }
  }
