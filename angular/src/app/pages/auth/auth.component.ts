import {Component, OnInit} from '@angular/core';
import {UserCredentials} from '../../common/dto.common';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {}

  onSignUp(signUpForm: UserCredentials): void {
    this.authService.signup(signUpForm);
  }

  onSignIn(signInForm: UserCredentials): void {
    this.authService.signin(signInForm);
  }
}
