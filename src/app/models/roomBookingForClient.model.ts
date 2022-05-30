import { NgModuleDecorator } from "@angular/core";
import { daySHourEHour } from "./daySHourEHour.model";

export class RoomBookingForClient{

    sDate!:Date;
    eDate!:Date;
    roomType!:number;
    roomName!:string;
    DayHours!:daySHourEHour[];
}