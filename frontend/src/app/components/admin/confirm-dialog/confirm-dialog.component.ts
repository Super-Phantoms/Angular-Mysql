import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeleteSectionDialogData } from '../dtmng-section/dtmng-section.component';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: DeleteSectionDialogData,) {
    
    this.align_center = "center";
  }
  public align_center;

  onNoClick(): void {
    this.dialogRef.close();
  }
}
