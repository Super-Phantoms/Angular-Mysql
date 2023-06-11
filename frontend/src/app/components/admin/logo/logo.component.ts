import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { HttpService } from 'src/app/service/http.service/http.service';
import { NgAxiosComponent } from 'src/app/service/ng-axios/ng-axios.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrComponent } from '../toastr/toastr.component';
import { getApiUrl } from 'src/app/service/utils';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent {

  public logo_image1: string = '';
  public logo_title1: string = '';

  public logo_image2: string = '';
  public logo_title2: string = '';

  public logo_image3: string = '';
  public logo_title3: string = '';
  /**
   * file upload for Introduction Video (Media URL) 
   */
  selectedFile1: File | null = null;
  selectedFile2: File | null = null;
  selectedFile3: File | null = null;

  // cur_progress: number = 0;
  // progressbar_show: string = "pgbar_hide";
  // color: ThemePalette = 'primary';
  // mode: ProgressBarMode = 'determinate';

  url: string;

  private ngAxios;
  private toastr;

  constructor( public httpService: HttpService, private _snackBar: MatSnackBar,){
    this.ngAxios = new NgAxiosComponent( httpService, _snackBar );
    this.toastr = new ToastrComponent(_snackBar);

    this.url = getApiUrl('api/logo')

  }

  deleteImage = ( $event ) => {
    // let fileInput = $($event.target).parents('form').find("input[type='file']");
    // fileInput.trigger('click');
  }

  createImage = ( $event ) => {
    // let fileInput = $($event.target).parents('form').find("input[type='file']");
    // fileInput.trigger('click');
  }

  updateImageTitle = ( $event ) => {
    // let fileInput = $($event.target).parents('form').find("input[type='file']");
    // fileInput.trigger('click');
  }

  updateImage1 = ( $event: any ) => {

    this.selectedFile1 = $event.selectedFile;
  }

  updateImage2 = ( $event: any ) => {

    this.selectedFile2 = $event.selectedFile;
  }

  updateImage3 = ( $event: any ) => {

    this.selectedFile3 = $event.selectedFile;
  }

  _onClickSave = ( $event ) => {

    var formData = new FormData();
  
      if (this.selectedFile1) {
        formData.append('logo_image1', this.selectedFile1); 
      }
      if (this.selectedFile2) {
        formData.append('logo_image2', this.selectedFile2); 
      }
      if (this.selectedFile3) {
        formData.append('logo_image3', this.selectedFile3); 
      }


      if(this.selectedFile1 == null && this.selectedFile2 == null && this.selectedFile3 == null) {
        return;
      }

      this.ngAxios.ng_upload(this.url, formData, ( progress: any ) => {}, ( event ) => {
        
        // this.selectedFile = null;
      });
  }
}




