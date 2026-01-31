import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[
      Validators.required, Validators.minLength(8),
      Validators.maxLength(32)]),
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }
  
  loginSuccess=false;

  onSubmit(){
    if(this.loginForm.valid){
    console.log('Form submitted', this.loginForm.value);
    this.loginSuccess=true;
    //resets the form
    this.loginForm.reset();
  }
}

}
