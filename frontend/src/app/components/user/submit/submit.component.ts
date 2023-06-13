import { Component, OnInit ,AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { get } from 'scriptjs';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import * as $ from 'jquery';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { nineDigitsValidator } from './nine-digits.validator';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss']
})
export class SubmitComponent implements OnInit,AfterViewInit {
  public validator: boolean;
  public reCaptchaFlag:boolean;
  public submitSuccessFlag: boolean;
  public loggingIn: boolean;
  myForm: FormGroup;
 
  constructor(@Inject(DOCUMENT) private document: Document,private formBuilder: FormBuilder){
    this.validator = false; 
    this.reCaptchaFlag = false;
    this.submitSuccessFlag = false;
    this.loggingIn = false;
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email,Validators.maxLength(50)]],
      phone:['',[Validators.required,Validators.maxLength(15),nineDigitsValidator()]],
      message:['',[Validators.required]]
    });
  }
  
  ngOnInit() {
   
  }  
  ngAfterViewInit(): void {
 
  }
  submitForm(event){
    this.loggingIn = true;
    event.preventDefault();
    
    if (this.myForm.valid) {
      // Form is valid, perform desired action
      this.loggingIn = true;
      let theThis = this;
      console.log('Form submitted');
      let form = $("#formGroup");
      const window = this.document.defaultView as any;
      window.emailjs && window.emailjs.sendForm('service_j6kwv3q', 'template_3gjbnck', form[0])
      .then(function() {
        console.log('SUCCESS!');
        theThis.loggingIn = false;
        theThis.reCaptchaFlag = false;
        theThis.submitSuccessFlag = true;
      }, function(error) {
        theThis.loggingIn = false;
        console.log(error.text);
        if(error.text.includes('reCAPTCHA')){
          theThis.reCaptchaFlag = true;
        }
          console.log('FAILED...', error);
      });
      
    } else {
      // Form is invalid, display error messages or take appropriate action
      this.loggingIn = false;
      console.log('Form is invalid');
      this.validator = true;
      // this.myForm.get('name')?.
      console.log(this.validator);
    }
  }

  onInputFocus() {
   
  }
}
