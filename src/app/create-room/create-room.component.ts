import { outputAst } from '@angular/compiler';
import { Component, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogCreateRoomComponent } from '../dialog-create-room/dialog-create-room.component';
import { Div } from '../models/div.model';
import { Room } from '../models/room.model';


export interface DialogCreateRoomData {
  room: Room;
}

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})

export class CreateRoomComponent implements OnInit {

  animal!: string;
  name!: string;

  rooms: Room[] = [];
  room: Room = new Room();

  action: boolean = true;

  d = document.getElementById("div");

  constructor(private renderer: Renderer2, public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogCreateRoomComponent, {
      width: '20%',
      data: { room: this.room },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  ngOnInit(): void {
  }

  addPoints(pos: MouseEvent) {

    //let map = document.getElementById('map');

    if (this.action) {

      this.room.xStartPoint = pos.offsetX;//- map!.offsetTop;
      this.room.yStartPoint = pos.offsetY;// - map!.offsetTop;
      console.log("s: " + this.room.xStartPoint, this.room.yStartPoint)
      this.action = false;

    }

    else {
      this.room.xEndPoint = pos.offsetX;//- map!.clientTop;
      this.room.yEndPoint = pos.offsetY;//- map!.clientTop;
      console.log("e: " + this.room.xStartPoint, this.room.yEndPoint)
      this.action = true;

      this.drawDiv();
      this.openDialog();
    }
  }

  drawDiv() {

    let map = document.getElementById('map');

    this.d = document.getElementById("div");
    if (this.d) {
      this.d.style.position = "absolute";
      //נכון?
      this.d.style.left = this.room.xStartPoint + "px";
      this.d.style.top =  this.room.yStartPoint + "px";
      this.d.style.width = this.room.xEndPoint - this.room.xStartPoint + "px";
      this.d.style.height = this.room.yEndPoint - this.room.yStartPoint + "px";
      this.d.style.backgroundColor = "red";
    }
  }
}
