import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogCreateRoomData } from '../create-room/create-room.component';
import { DialogUserIdData } from '../find-users/find-users.component';
import { User } from '../models/user.model';
import { User_Service } from '../services/user.service';

@Component({
  selector: 'app-dialog-user-details',
  templateUrl: './dialog-user-details.component.html',
  styleUrls: ['./dialog-user-details.component.css']
})
export class DialogUserDetailsComponent implements OnInit {

  user!:User;

  constructor(
    private _userD: User_Service,
    public dialogRef: MatDialogRef<DialogUserDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogUserIdData,
  ) { }

  ngOnInit(): void {
    this.user=this.data.user;
  }

  GetChildData(user:User){
    this.dialogRef.close(user);
  }
}
