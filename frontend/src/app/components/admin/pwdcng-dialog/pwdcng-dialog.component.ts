import { Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, ValidationErrors, AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Validators } from '@angular/forms';
import { NgAxiosComponent } from 'src/app/service/ng-axios/ng-axios.component';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { getApiUrl } from 'src/app/service/utils';
import { HttpService } from 'src/app/service/http.service/http.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { StoreService } from 'src/app/service/StoreService/store.service';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
    const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);

    return invalidCtrl || invalidParent;
  }
}

@Component({
  selector: 'app-pwdcnd-dialog',
  templateUrl: './pwdcng-dialog.component.html',
  styleUrls: ['./pwdcng-dialog.component.css']
})
export class PwdcngDialogComponent {

  // To check whether password is consistent with confirm password
  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    const passControl: AbstractControl | null = group.get('new_password');
    const confirmPassControl: AbstractControl | null = group.get('cfm_password');

    if(passControl == null || confirmPassControl == null) return {notSame: true};
    
    const pass = passControl.value;
    const confirmPass = confirmPassControl.value;
    return (pass === confirmPass) ? null : { notSame: true }
  }

  // To define chgPassForm
  chgPassForm: FormGroup = new FormGroup({
    old_password: new FormControl('', Validators.required),
    new_password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    cfm_password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  }, { validators: this.checkPasswords })

  public matcher = new MyErrorStateMatcher();
  private router;
  private axios: NgAxiosComponent;

  constructor(
            public httpService: HttpService, 
            private _snackBar: MatSnackBar, 
            private store: StoreService, 
            private r: Router,
            private dialogRef: MatDialogRef<PwdcngDialogComponent>) {
    this.axios = new NgAxiosComponent( httpService, _snackBar);
    this.router = r;
    this.align_center = "center";
  }
  public align_center;

  onSubmitChange() {
    const theThis = this;

    if(this.chgPassForm.valid) {
      const url = getApiUrl('api/auth/updtPass');
      this.axios.ng_post(url, this.chgPassForm.value, function(res) {
        theThis.dialogRef.close();
      })
    } 
    return false;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
