import { Time } from '@angular/common';
import { NullVisitor } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
//import { moveMessagePortToContext } from 'worker_threads';
import { Base_code } from '../models/base_code.model';
import { Day_room_booking } from '../models/day_room_booking.model';
import { Room_booking } from '../models/room_booking.model';
import { User } from '../models/user.model';
import { Room_booking_Service } from '../services/room_booking.service';
import { User_Service } from '../services/user.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroupDirective, NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogAvailabilityComponent } from '../dialog-availability/dialog-availability.component';
import { DateTimeType } from '../models/dateTimeType.model';
import { DatePipe } from '@angular/common'
import { RoomBookingForClient } from '../models/roomBookingForClient.model';
import { Room_Service } from '../services/room.service';
import { daySHourEHour } from '../models/daySHourEHour.model';
//import { time } from 'console';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface DialogAvailabilityData {
  details: DateTimeType[];
}

@Component({
  selector: 'app-room-booking',
  templateUrl: './room-booking.component.html',
  styleUrls: ['./room-booking.component.css']
})
export class RoomBookingComponent implements OnInit {

  matcher = new MyErrorStateMatcher();

  days: Base_code[] = [{ id: 5, description: "ה", isSelected: false },
  { id: 4, description: "ד", isSelected: false },
  { id: 3, description: "ג", isSelected: false },
  { id: 2, description: "ב", isSelected: false },
  { id: 1, description: "א", isSelected: false }];

  types = [
    { id: 5, name: "חדר ישיבות" },
    { id: 6, name: "חדר מחשבים" },
    { id: 7, name: "עמדת מחשב" }
  ];

  rNames :Base_code[]= [];

  rBookings!: Room_booking[];
  rBookingObj!: RoomBookingForClient[];
  rBs: RoomBookingForClient[] = [];

  selectedDays: Room_booking[] = [];
  //selectedDaysDetails: Room_booking[] = [];
  help: Room_booking[] = [];
  dayon: boolean[] = [false];
  roomb_details!: FormGroup;
  user!: User;
  r!: Room_booking;
  d!: number;
  j!: Date;
  details: DateTimeType[] = [];

  dateTimeSelected: Room_booking[] = [];
  constructor(private _userService: User_Service, private _roomB: Room_booking_Service, public dialog: MatDialog, public datepipe: DatePipe) { }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAvailabilityComponent, {
      width: '70%',
      height: '50%',
      data: {
        details: this.details
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  ngOnInit(): void {
    this.user = this._userService.getCurrentUser();
    this.roomb_details = new FormGroup({
      roomType: new FormControl('valid', Validators.required),
      roomName: new FormControl('valid', Validators.required),
      s_date: new FormControl(),
      e_date: new FormControl(),
      s_hour: new FormControl(),
      e_hour: new FormControl()
    })

    //this.rBookings = this._roomB.getRBookings();
  }

  
  day(d: Base_code) {

    //לשנות
    this.rBookings = this._roomB.getRBookings();
    this.fillRBookings();

    this.d = d.id;

    var sd = this.roomb_details.controls["s_date"].value + ' ' + this.roomb_details.controls['s_hour'].value;
    var ed = this.roomb_details.controls["e_date"].value + ' ' + this.roomb_details.controls['e_hour'].value;

    if (d.isSelected == false) {
      d.isSelected = true;
      this.dateTimeSelected[d.id - 1] = {
        id: 0,
        idUser: this._userService.getCurrentUser().idNumber,
        roomName: this.roomb_details.controls["roomType"].value,
        startDateTime: new Date(sd),
        endDateTime: new Date(ed),
        timeDeviation: 15
      };
      this.dayon[d.id - 1] = true;
    }
    else {
      d.isSelected = false;
      this.dateTimeSelected[d.id - 1] = this.r;
      this.dayon[d.id - 1] = false;
    }

    this.help = this.dateTimeSelected.filter(x => x != this.r);

    //this.selectedDays=this.days.filter(d=>d.isSelected);
  }

  fillUp() {
    // if(this.roomb_details.controls['s_hour'].value!=null  && this.roomb_details.controls["e_hour"].value!=null){
    //   this.selectedDays[this.d-1].start_dateTime=this.roomb_details.controls["s_hour"].value;
    //   this.selectedDays[this.d-1].end_dateTime=this.roomb_details.controls["e_hour"].value;
    const s_time = this.roomb_details.controls["s_hour"].value;
    const e_time = this.roomb_details.controls["e_hour"].value;

    if (this.roomb_details.controls['s_hour'].value != null && this.roomb_details.controls["e_hour"].value != null) {
      // this.dateTimeSelected[this.d-1].start_dateTime.setHours((s_time.split(' ')[0]).split(':')[0]);
      // this.dateTimeSelected[this.d-1].end_dateTime.setHours((e_time.split(' ')[0]).split(':')[0]);

      //var d10 = new Date(this.roomb_details.controls["s_date"].value).transfo + ' ' + this.roomb_details.controls['s_hour'].value).toString();
      var helpS = this.datepipe.transform(this.roomb_details.controls["s_date"].value, 'yyyy-MM-dd');
      var d10 = helpS + ' ' + this.roomb_details.controls['s_hour'].value;
      //var d20 = (this.roomb_details.controls["e_date"].value + ' ' + this.roomb_details.controls['e_hour'].value).toString();
      var helpE = this.datepipe.transform(this.roomb_details.controls["e_date"].value, 'yyyy-MM-dd');
      var d20 = helpE + ' ' + this.roomb_details.controls['e_hour'].value;
      this.dateTimeSelected[this.d - 1].startDateTime = new Date(d10);
      // end_dateTime:e_date,
      this.dateTimeSelected[this.d - 1].endDateTime = new Date(d20);

      // this.selectedDays[this.d-1]={
      //   id:0,
      //   id_user:this.userService.getCurrentUser().id,
      //   id_room:this.roomb_details.controls["type"].value,
      //   start_date:this.roomb_details.controls["s_date"].value,
      //   end_date:this.roomb_details.controls["e_date"].value,
      //   start_hour: this.roomb_details.controls["s_hours"[this.d]].value,
      //   end_hour: this.roomb_details.controls["e_hour"[this.d]].value,
      //   time_deviation: 15
      //};
    }
  }

  save() {

    // if (!this.validAllFull())
    //   alert("נא מלאו את כל הפרטים הרלוונטים");
    // else {
    let pos = 0;
    this.help.forEach(element => {
      if (element)
        element.idUser = this._userService.getCurrentUser().idNumber;
      if (element.idUser != "")
        pos = pos + 1;
      // for(let i in this.dayon)
      // {
      //   if(i)
      //   {
      //     //this.dayon.indexOf(true);
      //     pos=index;
      //     break;
      //   }
      //   else
      //     index+1;
      // }
      // element.start_hour=this.roomb_details.controls["s_hour"].value();
      // element.end_hour=this.roomb_details.controls["e_hour"].value();



      element.roomName = "לובי";




      //element.end_date=Date.now();
      //let pos =this.dayon.indexOf(true);
      this.dayon[pos] = false;
      //element.end_hour=element.end_hour.getTime()
      this._roomB.postRb(element).subscribe(id => {
        let dayr = new Day_room_booking(pos, id);
        this._roomB.postday(dayr).subscribe();
        alert("החדר נשמר בהצלחה=")
        //רק צריכות לסדר בסרבר את האיידי של טבלת הימים 
        //הוא מתמלא רק שורה אחת
      })
    })
  }

  seeMap() {

    if (!this.validAllFull())
      alert("נא מלאו את כל הפרטים הרלוונטים");
    else {
      this.help.forEach(el => {
        if (el) {
          let dateTimeType = new DateTimeType();
          dateTimeType.sDateTime = el.startDateTime;
          dateTimeType.eDateTime = el.endDateTime;
          dateTimeType.type = this.roomb_details.controls['roomType'].value;
          this.details.push(dateTimeType);
        }
      });
      this.openDialog();
    }
  }

  validAllFull() {

    if (this.roomb_details.controls['roomType'].value &&
      this.roomb_details.controls['s_date'].value &&
      this.roomb_details.controls['e_date'].value &&
      this.roomb_details.controls['s_hour'].value &&
      this.roomb_details.controls['e_hour'].value)
      return true;
    return false;
  }

  fillRBookings() {
    let t = new Date();
    t.setHours(0,0,0,0);
    let DayRBooking;
    this.rBookingObj = [];

    let forArray: daySHourEHour = new daySHourEHour();

    this.rBookings.forEach(el => {

      DayRBooking = this._roomB.getday(el.id).subscribe(dayIt => {
        forArray.day = dayIt.day;
        forArray.sHour = el.startDateTime;
        forArray.eHour = el.endDateTime;

        if (!this.rBookingObj[0]) {
          let obj: RoomBookingForClient = new RoomBookingForClient();
          var x1 = this.datepipe.transform(el.startDateTime, 'yyyy-MM-dd');
          obj.sDate = new Date(x1+' '+t);
          var x2 = this.datepipe.transform(el.endDateTime, 'yyyy-MM-dd');
          obj.eDate = new Date(x2+' '+t);
          obj.roomName = el.roomName
          obj.DayHours = [];
          obj.DayHours.push(forArray);

          this.rBookingObj.push(obj);
        }
        else {
          this.rBookingObj.find(rB => {

            if (rB.sDate ==new Date(x1+' '+t)  &&
              rB.eDate == new Date(x2+' '+t) &&
              rB.roomName == el.roomName) {
              rB.DayHours.push(forArray);
            }
            else {
              let obj: RoomBookingForClient = new RoomBookingForClient();

              obj.sDate = new Date(el.startDateTime);
              obj.eDate = new Date(el.endDateTime);
              obj.roomName = el.roomName
              obj.DayHours = [];
              obj.DayHours.push(forArray);

              this.rBookingObj.push(obj);
            }
          })

          if (el == this.rBookings[this.rBookings.length - 1]) {
            console.log("this.rBookings.length-1  ", this.rBookings.length - 1)
            //להעביר למערכים שעליהם נרוץ וכמספר איבריהם נציג
            this.rBs = this.rBookingObj;
          }
        }
      });
    })
  }
} 