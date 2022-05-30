import { Room_type } from "./room_type.enum";

export class Room{

    id!:number;
    idRoomType!:Room_type;
    name!:string;
    xStartPoint!:number;
    yStartPoint!:number;
    xEndPoint!:number;
    yEndPoint!:number;
    capacity?:number;
    active!:boolean;

}