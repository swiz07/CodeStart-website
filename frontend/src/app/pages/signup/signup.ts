import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth-service/auth-service';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './signup.html',
    styleUrl: './signup.scss',
})
export class Signup {
    signupForm: FormGroup;

    constructor(private fb: FormBuilder, private authService: AuthService) {
        this.signupForm = this.fb.group(
            {
                password: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(8),
                        this.hasUppercase,
                        this.hasNumber,
                        this.hasSpecialCharacter,
                    ],
                ],
                confirmPassword: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]],
                fullname: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(3),
                    ],
                ],

            },
            { validators: this.passwordMatchValidator }
        );

    }

    // Custom validator to check if passwords match
    passwordMatchValidator(form: FormGroup) {
        const password = form.get('password')?.value;
        const confirmPassword = form.get('confirmPassword')?.value;
        if (password !== confirmPassword) {
            return { passwordMismatch: true };
        }
        return null;
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

    //email and full name getters:
    get email() {
        return this.signupForm.get('email');
    }

    get fullname() {
        return this.signupForm.get('fullname');
    }

    // check if a specific control has a specific error and if it was touched
    hasError(controlName: string, errorName: string) {
        return (
            this.signupForm.get(controlName)?.hasError(errorName) &&
            this.signupForm.get(controlName)?.touched
        );
    }

    // Form Submit
    onSubmit() {
        if (this.signupForm.valid) {
            const formValue = {
                full_name: this.signupForm.value.fullname,
                email: this.signupForm.value.email,
                password: this.signupForm.value.password
            };

            this.authService.signup(formValue).subscribe({
                next: (data) => {
                    console.log('Backend message', data);
                    alert('Form submitted successfully');
                    this.signupForm.reset();
                },
                error: (err) => {
                    console.log(err)
                    console.log('Something went wrong');
                }
            })
        } else {
            alert('Please check the form for errors');
        }
    }

}
