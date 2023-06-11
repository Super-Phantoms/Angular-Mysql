import { Component, ViewEncapsulation } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-toastr',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ToastrComponent {

  private toastr;
  constructor( private _snackBar: MatSnackBar, ){
    this.toastr = _snackBar;
  }
    
  success = ( msg ) => {
    this._snackBar.open('SUCCESS', msg, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3 * 1000,
      // panelClass:  ["custom-style"]
    });
  }

  error = ( msg ) => {
    this._snackBar.open('ERROR', msg, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3 * 1000,
    });
  }

  warning = ( msg ) => {
    this._snackBar.open('WARNING', msg, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3 * 1000,
    });
  }

  broken = ( msg ) => {
    this.error( 'Communitation error!' );
  }

}

