import { Byte } from "@angular/compiler/src/util";

export class User{
    id:number=0;
    idNumber:string="";
    firstName!:string;
    lastName!:string;
    phone!:string;
    mail?:string;
    marriageStatus!:string;
    workingStatus!:string;
    permanentWorker!:boolean;
    occupation?:string;
    //fingerprint?:Byte[];
   
}

