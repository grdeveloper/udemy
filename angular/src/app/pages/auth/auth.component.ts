import {Component, OnInit} from '@angular/core';
import {UserCredentials} from '../../common/dto.common';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSignUp(signUpForm: UserCredentials): void {
    console.log('signUp', signUpForm);
  }

  onSignIn(signInForm: UserCredentials): void {
    console.log('signIn', signInForm);
  }
}
