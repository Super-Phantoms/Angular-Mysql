import { Input, Component, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, ValidationErrors, AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Validators } from '@angular/forms';
import { NgAxiosComponent } from 'src/app/service/ng-axios/ng-axios.component';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { getApiUrl } from 'src/app/service/utils';
import { HttpService } from 'src/app/service/http.service/http.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { StoreService } from 'src/app/service/StoreService/store.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';


class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
    const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);

    return invalidCtrl || invalidParent;
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  // To check whether password is consistent with confirm password
  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    const passControl: AbstractControl | null = group.get('reg_password');
    const confirmPassControl: AbstractControl | null = group.get('reg_confirm_pass');

    if(passControl == null || confirmPassControl == null) return {notSame: true};
    
    const pass = passControl.value;
    const confirmPass = confirmPassControl.value;
    return (pass === confirmPass) ? null : { notSame: true }
  }
  

  // To define login form
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });


  // To define registerform
  registerForm: FormGroup = new FormGroup({
    reg_username: new FormControl('', Validators.required),
    reg_password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    reg_confirm_pass: new FormControl('', [Validators.required, Validators.minLength(6)]),
    reg_email: new FormControl('', [Validators.required, Validators.email])
  }, { validators: this.checkPasswords })

  public loggingIn = false;
  public matcher = new MyErrorStateMatcher();
  private router;
  private axios: NgAxiosComponent;

  constructor(
            public httpService: HttpService, 
            private _snackBar: MatSnackBar, 
            private store: StoreService, 
            private r: Router) {
    const theThis = this;
    this.axios = new NgAxiosComponent( httpService, _snackBar);
    this.router = r;

    const token = localStorage.getItem("jwt_token");
    if(token) {
      // To check the token's validity
      const url = getApiUrl('api/auth/chk_token');
      this.axios.ng_get(url, function(res) {
        theThis.store.updateIsLoggon(res);
        theThis.router.navigateByUrl('/admin/home/1');
      });
    }
  }

  ngAfterViewInit(): void {
  }

  onSubmitLogin() {
    const theThis = this;
    if (this.loginForm.valid) {
      this.loggingIn = true;

      const url = getApiUrl('api/auth/login');
      this.axios.ng_post(url, this.loginForm.value, function(res){
        theThis.loggingIn = false;
        localStorage.setItem("jwt_token", res.token);
        theThis.store.updateIsLoggon(true);
        theThis.router.navigateByUrl('/admin/home/1');
      },

      function() {
        theThis.loggingIn = false;
      });
    }
    return false;
  }

  onSubmitRegister() {
    if(this.registerForm.valid) {
      const url = getApiUrl('api/auth/register');
      this.axios.ng_post(url, this.registerForm.value, function(res) {
        console.log(res);
      })
    } 
    return false;
  }
}
