import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponsesService } from '../core/services/responses.service';

import { Errors, UserService, User } from '../core';

@Component({
    selector: 'app-add-response',
    templateUrl: './add-response.component.html'
  })
  export class AddResponseComponent implements OnInit {
    @Input()commentId;
    authType: String = '';
    errors: Errors = {errors: {}};
    isSubmitting = false;
    authForm: FormGroup;
    credentials: [];
    response: string;

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
        this.route.url.subscribe(data => {
            // Get the last piece of the URL (it's either 'login' or 'register')
            this.authType = data[data.length - 1].path;
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
          // this.router.navigateByUrl('localhost:4200/article/' + this.authType);
          return data;
        } ,
        err => {
          this.errors = err;
          console.log(err);
          this.isSubmitting = false;
        }
      );
    }
  }
