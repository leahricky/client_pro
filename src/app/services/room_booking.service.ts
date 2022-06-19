import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Time } from "@angular/common";
import { Room_booking } from "../models/room_booking.model";
import { Observable } from 'rxjs';
import { Day_room_booking } from "../models/day_room_booking.model";
import { DatePipe } from '@angular/common'
import { User } from "../models/user.model";
import { RoomBookingForClient } from "../models/roomBookingForClient.model";

@Injectable()
export class Room_booking_Service {
    constructor(private _http: HttpClient, private datepipe: DatePipe) {

    }

    rBookings!: RoomBookingForClient[];

    //מקבל תז והולך לגט לקבל מהסרבר את ההזמנות ומציב אותן במערך
    // setRBookings(user: User) {
    //     this.getRbsById(user.idNumber).subscribe(x => {
    //         this.rBookings = x;
    //     })
    // }

    // getRBookings(): RoomBookingForClient[] {
    //     return this.rBookings;
    // }

    getRbsById(id: string): Observable<RoomBookingForClient[]> {
        return this._http.get<RoomBookingForClient[]>("api/RoomBooking/" + id);
    }

    getRbs(type: number, sDateTime: Date, eDateTime: Date): Observable<RoomBookingForClient[]> {
        
        let sHelp = this.datepipe.transform(sDateTime, 'yyyy-MM-dd');
        let eHelp = this.datepipe.transform(eDateTime, 'yyyy-MM-dd');

        return this._http.get<RoomBookingForClient[]>("api/RoomBooking/" + type + "/" + sHelp + "/" + eHelp);
    }

    postRb(rb: Room_booking): Observable<number> {
        return this._http.post<number>("/api/RoomBooking/", rb);
    }

    postday(day: Day_room_booking) {
        return this._http.post("api/DayRoomBooking/", day);
    }

    getday(id: number): Observable<Day_room_booking> {
        return this._http.get<Day_room_booking>("api/DayRoomBooking/" + id);
    }

    putRb(rb: Room_booking) {
        return this._http.put("api/RoomBooking", rb);
    }

    putRbs(lrb: Room_booking[]) {
        return this._http.put("api/RoomBooking", lrb);
    }

    deleteRb(id: string) {
        return this._http.delete("api/RoomBooking/" +id);
    }
}