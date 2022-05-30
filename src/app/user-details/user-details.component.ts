import { getLocaleNumberFormat } from '@angular/common';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { fingerprint } from '@angular/compiler/src/i18n/digest';
import { Byte } from '@angular/compiler/src/util';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { __spreadArray } from 'tslib';
//import { Marriage_status } from '../models/marriage_status.enum';
import { User } from '../models/user.model';
//import { Working_status } from '../models/working_status.enum';
import { User_Service } from '../services/user.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroupDirective, NgForm } from '@angular/forms';
import { Room_booking_Service } from '../services/room_booking.service';
import { NullVisitor } from '@angular/compiler/src/render3/r3_ast';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})

export class UserDetailsComponent implements OnInit {

  @Input()
  userDialog!: User;

  // work = Working_status;
  user_details_f!: FormGroup;
  fromDialog:boolean = true;
  //idMarriageStatus: typeof Marriage_status=Marriage_status;
  matcher = new MyErrorStateMatcher();

  constructor(private _user: User_Service, private _roomB: Room_booking_Service) {
    //this.user.permanentWorker=false;
  }


  ngOnInit(): void {
    this.user_details_f = new FormGroup({
      idNumber: new FormControl("", [Validators.required, Validators.pattern("[0-9]{9}")]),
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      mail: new FormControl("", Validators.email),
      phone: new FormControl("", [Validators.required, Validators.pattern("[0-9]{9,10}")]),
      marriageStatus: new FormControl('valid', Validators.required),
      workingStatus: new FormControl('valid', Validators.required),
      occupation: new FormControl(),
      permanentWorker: new FormControl(),
      //fingerprint: new FormControl()
    })

    if(this.userDialog){
        this.user_details_f.controls['idNumber'].setValue(this.userDialog.idNumber);
        this.fillUp(this.userDialog);
        this.fromDialog=false;
    }
    else
    this.fromDialog=true;
  }

  workingStatusOpt = [
    { id: 18, name: "עצמאית" },
    { id: 19, name: "שכירה" },
    { id: 20, name: "פרילנסרית" }
  ];

  marriageStatusOpt = [
    { id: 13, name: "נשואה" },
    { id: 14, name: "רווקה" },
  ];

  flag_permanent: Boolean = false;
  user!: User;
  flag_add_edit: Boolean = false;
  flag_required: Boolean = false;
  f_print: Byte[] = [];
  path: string = "fprint";

  change() {
    if (this.flag_permanent == true)
      this.flag_permanent = false;
    else
      this.flag_permanent = true;
  }

  // converting_status() {
  //   if (this.user.idMarriageStatus == 0)
  //     this.user.idMarriageStatus = 10;
  //   else
  //     this.user.idMarriageStatus = 11;

  //   if (this.user.idWorkingStatus == 0)
  //     this.user.idWorkingStatus = 11;
  //   else if (this.user.idWorkingStatus == 1)
  //     this.user.idWorkingStatus = 12;
  //   else this.user.idWorkingStatus = 13;
  // }

  clear() {
    this.user_details_f.controls["firstName"].setValue("");
    this.user_details_f.controls["lastName"].setValue("");
    this.user_details_f.controls["mail"].setValue("");
    this.user_details_f.controls["phone"].setValue("");
    this.user_details_f.controls["marriageStatus"].setValue("");//לבדוק איך אפשר לשים פה ערך ברירת מחדל
    this.user_details_f.controls["workingStatus"].setValue("");
    this.user_details_f.controls["occupation"].setValue("");
    this.user_details_f.controls["permanentWorker"].setValue(false);
    //this.user_details_f.controls["fingerprint"].setValue("/assets/x.png");
    this.path = "fprint";
    this.flag_add_edit = false;
    this.flag_permanent = true;
    this.flag_required = false;
  }

  add_user() {
    this.flag_required = true;
    this.user = this.user_details_f.value;
    //this.user.fingerprint=this.f_print;
    //this.converting_status();
    // if(this.user.fingerprint==null)
    //   alert("שימי לב- לא הוכנסה טביעת אצבע")
    this._user.postUser(this.user)
      .subscribe(data => {
        if (data == null) alert(this.user.firstName + " " + this.user.lastName + " התווספה בהצלחה!");
        this.clear();
        this.user_details_f.controls["idNumber"].setValue("");//למה?
      });
  }

  update_user() {
    this.flag_required = true;
    //let id=this.user.id;
    this.user = this.user_details_f.value;
    // this.user.id=id;
    //this.converting_status();
    // if(this.user.fingerprint==null)
    //   alert("שימי לב- לא הוכנסה טביעת אצבע")
    this._user.putUser(this.user)
      .subscribe(data => {
        alert(this.user.firstName + " " + this.user.lastName + " התעדכנה בהצלחה!");
        this.clear();
        this.user_details_f.controls["idNumber"].setValue("");
      });
  }

  check_if_user_exists(id: string) {
    this._user.getUser(id)
      .subscribe(x => {
        this.user = x;
        this._user.setUser(x);
        if (this.user != null) {
          this.fillUp(this.user);
          // this.user_details_f.controls["firstName"].setValue(this.user.firstName);
          // this.user_details_f.controls["lastName"].setValue(this.user.lastName);
          // this.user_details_f.controls["mail"].setValue(this.user.mail);
          // this.user_details_f.controls["phone"].setValue(this.user.phone);
          // this.user_details_f.controls["marriageStatus"].setValue(this.user.marriageStatus);
          // this.user_details_f.controls["workingStatus"].setValue(this.user.workingStatus);
          // this.user_details_f.controls["occupation"].setValue(this.user.occupation);
          // this.user_details_f.controls["permanentWorker"].setValue(this.user.permanentWorker);
          // // if(this.user.fingerprint)//לבדוק אם אכן יש תמונה הוא שומר אותה
          // //   this.path="v";
          // // else
          // //   this.path="x";
          this.flag_add_edit = true;
          if (this.user.permanentWorker == false)
            this.flag_permanent = false;
          this._roomB.setRBookings(x);
        }
        else {
          this.clear();
        }
      })
  }


  fillUp(user:User){
    this.user_details_f.controls["firstName"].setValue(user.firstName);
    this.user_details_f.controls["lastName"].setValue(user.lastName);
    this.user_details_f.controls["mail"].setValue(user.mail);
    this.user_details_f.controls["phone"].setValue(user.phone);
    this.user_details_f.controls["marriageStatus"].setValue(user.marriageStatus);
    this.user_details_f.controls["workingStatus"].setValue(user.workingStatus);
    this.user_details_f.controls["occupation"].setValue(user.occupation);
    this.user_details_f.controls["permanentWorker"].setValue(user.permanentWorker);
    // if(this.user.fingerprint)//לבדוק אם אכן יש תמונה הוא שומר אותה
    //   this.path="v";
    // else
    //   this.path="x";
  }

  // getRBookings(idNumber:string){

  //   this._roomB.getRbsById(idNumber).subscribe(x=>{
  //     this._roomB.setRBookings(x);
  //   })
  // }

}
