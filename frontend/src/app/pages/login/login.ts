import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';
import { AuthService } from '../../service/auth-service/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router:Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],//email is required
      password: ['', [
        Validators.required,//password required
        Validators.minLength(8),//password must be 8 characters long
        Validators.maxLength(32),]],//password cannot exceed 32 characters
    })
  };

  //getters
  get email() {
      return this.loginForm.get('email');
    }

  get password() {
      return this.loginForm.get('password');
    }

    loginSuccess = false;

    // Form Submit method
    onSubmit() {
      //calls the authservice to authenicate the user
      this.authService.login(this.loginForm.value).subscribe({
        next: (data) => {
          console.log('Backend message', data);
          //on successful login, store user data and navigate to the home page
          if(data.status==="Success"){
            this.authService.setUser(data.user)//saves the data
            this.router.navigate(["/home"])
          }

          //resets the form after submssion
          this.loginForm.reset();
        },
        error: (err) => {
          console.log(err)
        }
      })
    }

  }
