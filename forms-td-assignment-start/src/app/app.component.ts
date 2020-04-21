import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('f',{static: false}) signupForm: NgForm;

  user = {
    email: '',
    defaultSubscription: '',
    gender: '',
    password:''
  }

  password = '';

  submitted = false;

  defaultSubscription = 'advanced';

  onSubmit(){
    // console.log(this.signupForm);
    this.submitted = true;
    this.user.email = this.signupForm.value.userData.email;
    this.user.defaultSubscription = this.signupForm.value.userData.subscriptions;
    this.user.password = this.signupForm.value.userData.password;

    this.signupForm.reset();
  }

}
