import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as io from 'socket.io-client';
import { Errors, UserService, User } from '../core';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  authType: String = '';
  title: String = '';
  errors: Errors = {errors: {}};
  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  private socket = io('http://localhost:3000');

  ngOnInit() {
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;
      // Set a title for the page accordingly
      this.title = (this.authType === 'login') ? 'Commencer maintenant!' : 'Rejoindre mes potes';
      // add form control for username if this is the register page
      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl());
        this.authForm.addControl('role', new FormControl());
      }
    });
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = {errors: {}};
    const admin = 'ADMIN';
    const credentials = this.authForm.value;
    this.userService
    .attemptAuth(this.authType, credentials)
    .subscribe(
      data => {
        console.log(data['user'].id);
        this.router.navigateByUrl('/');
        // envoi notif coté serveur que l'user est connécté
        this.socket.emit('userConnected', {user: data['user'].id, username: data['user'].username});
        // message de bienvenue à l'utilisateur connécté
        this.socket.on('welcomeMessage', function(msg) {
          alert(msg);
        });
        // notification si nouvelle utilisateur connécté
        this.socket.on('notifUserConnected', function(res) {
          alert(res.message);
        });
        // mise à jour liste des user connécté
        this.socket.on('listeConnectedUser', function(res) {
          console.log('listeConnectedUser' + JSON.stringify(res));
        });
        this.socket.on('privateMessage', function(msg) {
          alert(msg.message);
        });
      },
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }
}
