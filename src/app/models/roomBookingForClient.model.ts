import { NgModuleDecorator } from "@angular/core";
import { daySHourEHour } from "./daySHourEHour.model";

export class RoomBookingForClient{

    startDate!:Date;
    endDate!:Date;
    roomName!:string;
    idUser!:string;
    days!:daySHourEHour[];
}