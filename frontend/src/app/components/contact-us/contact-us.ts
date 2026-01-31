import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-us',
  imports: [ReactiveFormsModule,CommonModule, FormsModule],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.scss',
})
export class ContactUs {
  contactForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    email: new FormControl('',[Validators.required, Validators.email]),
    message: new FormControl('', Validators.required),
  });

  submissionMessage:string=''; //this has the success message once the user clicks submit btn
  get name() {
    return this.contactForm.get('name');
  }
  get email() {
    return this.contactForm.get('email');
  }

  get message(){
    return this.contactForm.get('message');
  }
  
  onSubmit(){
    if(this.contactForm.valid){
    console.log('Form submitted', this.contactForm.value);

    //show success message
    this.submissionMessage='Thank you! Your message has been sent successfully.';

    //resets the form
    this.contactForm.reset();
  }
}

}
