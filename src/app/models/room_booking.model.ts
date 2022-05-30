import { Time } from "@angular/common";

export class Room_booking{
    
    id:number=0;
    idUser!:string;
    roomName!:string;
    startDateTime!:Date;
    endDateTime!:Date;
    
    //start_hour!:Date;
   /// end_hour!:Date;
    timeDeviation!:number;
}

