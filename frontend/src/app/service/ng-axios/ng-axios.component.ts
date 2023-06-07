import { Component } from '@angular/core';
import { HttpService } from '../http.service/http.service';
import { StoreService } from '../StoreService/store.service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { ToastrComponent } from 'src/app/components/admin/toastr/toastr.component';
import { HttpEventType } from '@angular/common/http';
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  template: '',
})
export class NgAxiosComponent {
  @BlockUI() blockUI: NgBlockUI;

  // public httpService: HttpService;
  constructor( httpService: HttpService, _snackBar: MatSnackBar){
    this.axios = httpService;
    this.toastr = new ToastrComponent(_snackBar);
  }
  private axios;
  private toastr;
  private req_count: number = 0;

  startBlockUI() {
    if(this.req_count <= 0) this.blockUI.start();
    this.req_count++;
  }
  stopBlockUI() {
    this.req_count--;
    if(this.req_count <= 0) {
      this.blockUI.stop();
    }
  }

  /**
   * Ajax Modules
   * 
   */
  ng_get( url: string, callback: any, err_callback: any = null, cond:any = null ) {
    this.startBlockUI();
    this.axios.get( url, cond ).subscribe(
      ( res: any ) => {
        this.stopBlockUI();
        if( res.success == 'true' ) {
          res.msg && this.toastr.success(res.msg);
          callback && callback( res.data );
        } else {
          res.msg && this.toastr.error( res.msg );
          err_callback && err_callback();
        }
      },
      ( err: any ) => {
        console.log( err );
        if(err.status == 403 || err.status == 401) {
          window.location.href = '/login';
        } else {
          this.toastr.error('Server Error');
        }        
        this.stopBlockUI();
        this.toastr.broken;
      }
    )
  }

  ng_put( url: string, data: any, callback: any, err_callback: any = null) {
    this.startBlockUI();
    this.axios.put( url, data ).subscribe(
      ( res: any ) => {
        this.stopBlockUI();
        if( res.success == 'true' ) {
          res.msg && this.toastr.success(res.msg);
          callback && callback(res.data);
        } else {
          res.msg && this.toastr.error( res.msg );
          err_callback && err_callback();
        }
      },
      ( err: any ) => {
        console.log( err );
        if(err.status == 403 || err.status == 401) {
          window.location.href = '/login';
        } else {
          this.toastr.error('Server Error');
        }
        this.stopBlockUI();
        this.toastr.broken;
      }
    )
  }

  ng_post( url: string, data: any, callback: any, err_callback: any = null ) {
    this.startBlockUI();
    this.axios.post( url, data ).subscribe(
      ( res: any ) => {
        this.stopBlockUI();
        if( res.success == 'true' ) {
          res.msg && this.toastr.success( res.msg );
          callback && callback( res.data );
        } else {
          res.msg && this.toastr.error( res.msg );
          err_callback && err_callback();
        }
      },
      ( err: any ) => {
        console.log( err );
        if(err.status == 403 || err.status == 401) {
          window.location.href = '/login';
        } else {
          this.toastr.error('Server Error');
        }
        this.stopBlockUI();
        this.toastr.broken;
      }
    )
  }

  ng_delete( url: string, callback: any, err_callback: any = null) {
    this.startBlockUI();
    this.axios.delete( url ).subscribe(
      ( res: any ) => {
        this.stopBlockUI();
        if( res.success == 'true' ) {
          res.msg && this.toastr.success(res.msg);
          callback && callback( res.data );
        } else {
          res.msg && this.toastr.error( res.msg );
          err_callback && err_callback();
        }
      },
      ( err: any ) => {
        console.log( err );
        if(err.status == 403 || err.status == 401) {
          window.location.href = '/login';
        } else {
          this.toastr.error('Server Error');
        }
        this.stopBlockUI();
        this.toastr.broken;
      }
    )
  }

  ng_upload( url: string, data: any, progress_callback: any, response_callback ) {
    let progress;
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.axios.upload(url, data).pipe(
      map((event: any) => {
        if (event.type == HttpEventType.UploadProgress) {
          progress = Math.round((100 / event.total) * event.loaded);
          progress_callback(progress);
        } else if (event.type == HttpEventType.Response) {
          if(event.body.success == 'true') {
            this.toastr.success( 'Operation Successful' );
            response_callback(event);
          } else {
            console.log( event.body.data.code );
            this.toastr.error( event.body.data.msg );
          }
        }
      }),
      catchError((err: any) => {
        progress = 0;
        console.log( err );
        if(err.status == 403 || err.status == 401) {
          window.location.href = '/login';
        } else {
          this.toastr.error('Server Error');
        }
        this.toastr.broken;
        return throwError(err.message);
      })
    )
    .toPromise();
  }
}
