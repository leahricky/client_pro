import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { Data } from '@angular/router';
import { DateTimeType } from '../models/dateTimeType.model';
import { DialogAvailabilityData } from '../room-booking/room-booking.component';

@Component({
  selector: 'app-dialog-availability',
  templateUrl: './dialog-availability.component.html',
  styleUrls: ['./dialog-availability.component.css']
})
export class DialogAvailabilityComponent implements OnInit {

  constructor(
   // private _rooms: Room_Service,
    public dialogRef: MatDialogRef<DialogAvailabilityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogAvailabilityData,
  ) { }

  details!:DateTimeType[];
    // type!:number;
    // sDateTime!:Date[];
    // eDateTime!:Date[];

  ngOnInit(): void {
    this.details=this.data.details;
    // this.type=this.data.details.type;
    // this.sDateTime[0]=this.data.details.sDateTime[0];
    // this.eDateTime=this.data.details.eDateTime;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
