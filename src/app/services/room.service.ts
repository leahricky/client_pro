import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Time } from "@angular/common";
import { Room } from "../models/room.model";
import {Observable} from 'rxjs';

@Injectable()
export class Room_Service{
    constructor(private _http: HttpClient){

    }
 
    getrooms() :Observable<Room[]>{
        return this._http.get<Room[]>("api/room");
    }

    getroom(name: string):Observable<Room> {
        return this._http.get<Room>("api/room/name/"+name);
    }

    getroom_by_type(IdRoomType: number):Observable<Room[]> {
        return this._http.get<Room[]>("api/room/IdRoomType/"+IdRoomType);
    }
    
    postRoom(room: Room) {
        return this._http.post("api/room", room);
    }

    putRoom(room: Room) {
        return this._http.put("api/room", room);
    }
}