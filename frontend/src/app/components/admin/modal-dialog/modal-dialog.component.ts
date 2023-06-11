import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NewSectionDialogData } from '../dtmng-section/dtmng-section.component';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent {

  constructor(private dialogRef: MatDialogRef<ModalDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: NewSectionDialogData,) {
    
    this.align_center = "center";
  }
  public align_center;

  onNoClick(): void {
    this.dialogRef.close();
  }

  getResult = () => {
    return {
      new_section_title: this.data.new_section_title,
      value_01: this.data.value_01
    }
  }
}
