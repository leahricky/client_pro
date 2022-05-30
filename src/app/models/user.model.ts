import { Byte } from "@angular/compiler/src/util";
import { Marriage_status } from "./marriage_status.enum";
import { Working_status } from "./working_status.enum";

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

