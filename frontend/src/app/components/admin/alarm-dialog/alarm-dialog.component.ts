import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlarmDialogData } from '../dtmng-section/dtmng-section.component';

@Component({
  selector: 'app-alarm-dialog',
  templateUrl: './alarm-dialog.component.html',
  styleUrls: ['./alarm-dialog.component.css']
})
export class AlarmDialogComponent {
  constructor(private dialogRef: MatDialogRef<AlarmDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: AlarmDialogData,) {
    
    this.align_center = "center";
  }
  public align_center;

  onNoClick(): void {
    this.dialogRef.close();
  }
}
