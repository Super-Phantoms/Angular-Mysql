import { Component, OnInit,AfterViewInit, Directive, HostListener,ElementRef} from '@angular/core';
import { Location } from '@angular/common';
import { getApiUrl } from 'src/app/service/utils';
import { NgAxiosComponent } from 'src/app/service/ng-axios/ng-axios.component';
import { HttpService } from 'src/app/service/http.service/http.service';
import { MatSnackBar} from '@angular/material/snack-bar';
import { DomSanitizer} from '@angular/platform-browser'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreService } from 'src/app/service/StoreService/store.service';
import * as $ from 'jquery';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-user-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})

export class ContactComponent implements OnInit, AfterViewInit{
  public ngAxios : any;
  public address1:any;
  public address2:any;
  public realAddress1: any;
  public realAddress2: any;
  public validator: boolean;
  public reCaptchaFlag:boolean;
  public submitSuccessFlag: boolean;
  public loggingIn: boolean;
  myForm: FormGroup;
  phoneNumberPattern = /^\(\d{3}\)\d{3}-\d{4}$/;
  maskConfig = {
    showMaskTyped: false,
  };
  constructor(public http: HttpClient,public location: Location,public httpService: HttpService,private _snackBar: MatSnackBar,protected _sanitizer: DomSanitizer,private formBuilder: FormBuilder,public storeService: StoreService,@Inject(DOCUMENT) private document: Document) {
    this.ngAxios = new NgAxiosComponent( this.httpService,_snackBar ); 
    this.validator = false; 
    this.reCaptchaFlag = false;
    this.submitSuccessFlag = false;
    this.loggingIn = false;
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email,Validators.maxLength(50)]],
      phone:['',[Validators.required]],
      message:['',[Validators.required]]
    });
    this.storeService.contacts$.subscribe((data:any)=>{
      if(Object.keys(data).length == 0) return;
      this.address1 = data[0];
      this.address1.address = this.address1.address.replace(/\n/g, '<br>');
      this.address2 = data[1];
      this.address2.address = this.address2.address.replace(/\n/g, '<br>');
      let address1 = data[0].address;
      address1 = address1.replace(/<br>/g, ' ');
      let address2 = data[1].address;
      address2 = address2.replace(/<br>/g, ' ');
      this.realAddress1 = `https://maps.google.com/maps?q=${address1}&t=m&z=14&output=embed&iwloc=near`;
      this.realAddress2 = `https://maps.google.com/maps?q=${address2}&t=m&z=14&output=embed&iwloc=near`;
      
      let iframe:any = document.getElementById("map1");
      iframe.src = this.realAddress1;
      iframe = document.getElementById("map2");
      iframe.src = this.realAddress2;   
      iframe = document.getElementById('map1_mobile'); 
      iframe.src = this.realAddress1;
      iframe = document.getElementById('map2_mobile'); 
      iframe.src = this.realAddress2;

      let a:any = document.getElementsByClassName("map-link1");
      for(let i=0;i<a.length;i++)     
        a[i].href = `https://maps.google.com/maps?z=14&t=m&hl=en-US&gl=US&mapclient=embed&q=${address1}`;
      a = document.getElementsByClassName("map-link2");
      for(let i=0;i<a.length;i++)     
        a[i].href = `https://maps.google.com/maps?z=14&t=m&hl=en-US&gl=US&mapclient=embed&q=${address2}`;

    });
  }
  ngOnInit() {
    
  }
 ngAfterViewInit(): void {
   
 }

 submitForm() {  
    this.loggingIn = true;
    if (this.myForm.valid) {
      this.loggingIn = true;
      let theThis = this;
      let form = $("#formGroup");
      const window = this.document.defaultView as any;
      window.emailjs && window.emailjs.sendForm('service_j6kwv3q', 'template_3gjbnck', form[0])
      .then(function() {
          theThis.loggingIn = false;
          console.log('SUCCESS!');
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
    this.maskConfig.showMaskTyped = true;
  }
  

}

