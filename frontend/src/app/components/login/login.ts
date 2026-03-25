import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';
import { AuthService } from '../../service/auth-service';
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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(32),]],
    })
  };

  get email() {
      return this.loginForm.get('email');
    }

  get password() {
      return this.loginForm.get('password');
    }

    loginSuccess = false;

    // Form Submit
    onSubmit() {
      this.authService.login(this.loginForm.value).subscribe({
        next: (data) => {
          console.log('Backend message', data);
          if(data.status==="Success"){
            this.authService.setUser(data.user)
            this.router.navigate(["/home"])
          }
          this.loginForm.reset();
        },
        error: (err) => {
          console.log(err)
        }
      })
    }

  }
