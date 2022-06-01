import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { DateTimeType } from '../models/dateTimeType.model';
import { Div } from '../models/div.model';
import { Room } from '../models/room.model';
import { Room_booking } from '../models/room_booking.model';
import { Room_Service } from '../services/room.service';
import { Room_booking_Service } from '../services/room_booking.service';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})


export class AvailabilityComponent implements OnInit {

  @Input()
  details!: DateTimeType[];

  types = [
    { id: 5, name: "חדר ישיבות" },
    { id: 6, name: "חדר מחשבים" },
    { id: 7, name: "עמדת מחשב" }
  ];

  order_details!: FormGroup;
  l_roomb: Room_booking[] = [];
  flag_suc: Boolean = false;
  room: Room = new Room();
  divs: Div[] = [];
  divsTemp: Div[] = [];

  constructor(private _roomBData: Room_booking_Service, private _roomData: Room_Service, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.order_details = new FormGroup({
      type: new FormControl(),
      sDateTime: new FormControl(),
      eDateTime: new FormControl(),
      // s_hour: new FormControl("00:00"),
      // e_hour: new FormControl("00:00")
    })

    //אם כן הגיע ע"י הדיאלוג
    if (this.details) {
      //לאפס את הכנסת התאריכים ע"י הפרטים שהמשתמש הכניס?!
      this.order_details.controls['sDateTime'].setValue(this.details[0].sDateTime);
      this.order_details.controls['eDateTime'].setValue(this.details[0].eDateTime);
     // this.order_details.controls['type'].setValue(String(this.details[0].type));
      this.check_availability();
    }
  }

  check_availability() {

    console.log("check_availability()")
    //אם לא הגיע ע"י הדיאלוג
    if (!this.details) {
      this.details = [];
      this.details.push(this.order_details.value);
    }

    this.divs = [];
    this.divsTemp = [];

    this.details.forEach(el => {

      
      this._roomBData.getRbs(el.type, el.sDateTime, el.eDateTime)
        .subscribe(x => {
          this.l_roomb = x;

          console.log("this.l_roomb.length:" + this.l_roomb.length)

          if (this.l_roomb[0]) {
            alert("success");
            this.flag_suc = true;

            this.l_roomb.forEach(roomB => {

              this.fiilMap(roomB.roomName);

              //let newDiv = new Div();

              // this._roomData.getroom(roomB.idRoom)
              //   .subscribe(res => {
              //     this.room = res;
              //     console.log(".subscribe:" + this.room.name);

              //     newDiv.xStartPoint = this.room.xStartPoint;
              //     newDiv.yStartPoint = this.room.yStartPoint;
              //     newDiv.xEndPoint = this.room.xEndPoint;
              //     newDiv.yEndPoint = this.room.xStartPoint;

              //     divsTemp.push(newDiv);
              //     console.log("divsTemp:"+divsTemp)
              //   });
            });
          }
          else {
            alert(":(");
          }
        });

      // this.l_roomb.forEach(roomB=>{
      //   let newDiv=new Div();
      //   //let d=document.getElementById("div");
      //   this._roomData.getroom(roomB.idRoom)
      //   .subscribe(res=>{
      //     this.room=res;
      //     console.log(".subscribe");
      //   })
      //         newDiv.xStartPoint = this.room.xStartPoint;
      //         newDiv.yStartPoint = this.room.yStartPoint;
      //         newDiv.xEndPoint = this.room.xEndPoint;
      //         newDiv.yEndPoint=this.room.xStartPoint;

      //       this.divs.push(newDiv);
      // })
    })
  }

  fiilMap(roomName: string) {
    let newDiv = new Div();

    this._roomData.getroom(roomName)
      .subscribe(res => {
        this.room = res;
        console.log(".subscribe:" + this.room.name);

        //לשנות
        let map = document.getElementById('map');


        newDiv.xStartPoint = map!.offsetTop + this.room.xStartPoint;
        newDiv.yStartPoint = map!.offsetTop + this.room.yStartPoint;
        newDiv.xEndPoint = map!.offsetTop + this.room.xEndPoint;
        newDiv.yEndPoint = map!.offsetTop + this.room.yEndPoint;

        this.divsTemp.push(newDiv);
        //console.log("divsTemp:" + this.divsTemp)

        console.log("this.l_roomb.length:" + this.l_roomb.length + "this.divsTemp.length:" + this.divsTemp.length)
        if (this.divsTemp.length == this.l_roomb.length) {

          [...new Set(this.divsTemp)];
          console.log(this.divsTemp.length)

          this.divs = this.divsTemp;
          console.log("this.divs:" + this.divs);
        }
      });
  }

}
