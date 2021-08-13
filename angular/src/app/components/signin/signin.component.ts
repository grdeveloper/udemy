import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserCredentials} from '../../common/dto.common';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {
  @Output() signin = new EventEmitter<UserCredentials>();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  submitForm(): void {
    this.signin.emit(new UserCredentials(
      this.form.value.username,
      this.form.value.password,
    ));
  }
}
