import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogCreateRoomData } from '../create-room/create-room.component';
import { DialogUserIdData } from '../find-users/find-users.component';
import { Room_booking_Service } from '../services/room_booking.service';

@Component({
  selector: 'app-dialog-room-bookings',
  templateUrl: './dialog-room-bookings.component.html',
  styleUrls: ['./dialog-room-bookings.component.css']
})
export class DialogRoomBookingsComponent implements OnInit {

  constructor(
    private _rBooking: Room_booking_Service,
    public dialogRef: MatDialogRef<DialogRoomBookingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogUserIdData,
  ) { }

  ngOnInit(): void {

    this._rBooking.setRBookings(this.data.user);
  }

}
