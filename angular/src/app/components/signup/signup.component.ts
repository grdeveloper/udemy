import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {UserCredentials} from '../../common/dto.common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
  @Output() signup = new EventEmitter<UserCredentials>();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', [Validators.required, this.comparePasswords('password')]],
    });
  }

  ngOnInit(): void {}

  submitForm(): void {
    this.signup.emit(new UserCredentials(
      this.form.value.username,
      this.form.value.password,
    ));
  }

  comparePasswords(password: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.parent?.get(password)?.value === control.value ? null : {notSame: true};
    };
  }
}
