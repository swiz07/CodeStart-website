import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(32),
      this.hasUppercase,
      this.hasNumber,
      this.hasSpecialCharacter,]),
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  // Custom validator to check if the password contains at least one uppercase letter
  hasUppercase(control: AbstractControl) {
    const value = control.value;
    if (value && !/[A-Z]/.test(value)) {
      return { uppercase: true };
    }
    return null;
  }

  // Custom validator to check if the password contains at least one number
  hasNumber(control: AbstractControl) {
    const value = control.value;
    if (value && !/\d/.test(value)) {
      return { number: true };
    }
    return null;
  }

  // Custom validator to check if the password contains at least one special character
  hasSpecialCharacter(control: AbstractControl) {
    const value = control.value;
    if (value && !/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return { specialCharacter: true };
    }
    return null;
  }

  loginSuccess = false;

  // Form Submit
  onSubmit() {
    if (this.loginForm.valid) {
        alert(`Form Submitted Successfully`);
        this.loginForm.reset();
    } else {
        alert('Please check the form for errors');
    }
} 

}
