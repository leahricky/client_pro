import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user.model";
import { Time } from "@angular/common";
import { Observable } from 'rxjs';

@Injectable()
export class User_Service {

    user!: User;
    constructor(private _http: HttpClient) {
    }

    setUser(user: User) {
        this.user = user;
    }

    getCurrentUser(): User {
        return this.user;
    }

    whatever(ds: Date, de: Date): Observable<User[]> {
        return this._http.get<User[]>("api/User/" + ds + "/" + de);
    }

    getUser(id: string): Observable<User> {
        return this._http.get<User>("api/User/id_number/" + id);
    }

    postUser(user: User) {
        return this._http.post("api/User", user);
    }

    putUser(user: User) {
        return this._http.put("api/User", user);
    }

}