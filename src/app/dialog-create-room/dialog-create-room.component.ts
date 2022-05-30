import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogCreateRoomData } from '../create-room/create-room.component';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { Room } from '../models/room.model';
import { Room_Service } from '../services/room.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog-create-room.component.html',
  styleUrls: ['./dialog-create-room.component.css']
})
export class DialogCreateRoomComponent implements OnInit {

  types = [
    { id: 5, name: "חדר ישיבות" },
    { id: 6, name: "חדר מחשבים" },
    { id: 7, name: "עמדת מחשב" }
  ];

  room_details!: FormGroup;
  room: Room = new Room();
  d=document.getElementById("div");

  constructor(
    private _rooms: Room_Service,
    public dialogRef: MatDialogRef<DialogCreateRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogCreateRoomData,
  ) { }

  ngOnInit(): void {
    this.room_details = new FormGroup({
      roomType: new FormControl(),
      name: new FormControl(""),
      capacity: new FormControl()
    })

    //הגיוני??? לא! למצוא דרך אחרת
     // this.d=document.getElementById("div");
    //   if(this.d){
    //     this.d.style.position = "absolute";
    //     this.d.style.left = this.data.room.xStartPoint+"px";
    //     this.d.style.top = this.data.room.yStartPoint+"px";
    //     this.d.style.width=this.data.room.xEndPoint-this.data.room.xStartPoint+'px';
    //     this.d.style.height=this.data.room.yEndPoint-this.data.room.yStartPoint+'px';
    //     this.d.style.backgroundColor= "red";
    //   }
      
  }

  onNoClick(): void {
    this.dialogRef.close();
    // if(this.d)
    //   this.d.style.backgroundColor= "unset";
  }

  saveRoom() {
      this.room.id = 0;
      this.room.idRoomType = this.room_details.controls["roomType"].value;
      this.room.name = this.room_details.controls["name"].value;
      this.room.xStartPoint = this.data.room.xStartPoint;
      this.room.yStartPoint = this.data.room.yStartPoint;
      this.room.xEndPoint = this.data.room.xEndPoint;
      this.room.yEndPoint = this.data.room.yEndPoint;
      this.room.capacity = this.room_details.controls["capacity"].value;
      this.room.active = true;

    this._rooms.postRoom(this.room).subscribe(
      data => {
        alert(" נוסף בהצלחה!");
      }); 
    this.dialogRef.close();
  }
}


