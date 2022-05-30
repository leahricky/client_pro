import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { RoomBookingComponent } from './room-booking/room-booking.component';
import { RoomModule } from './modules/room.module';
import { UserModule } from './modules/user.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FindUsersComponent } from './find-users/find-users.component';
import { AvailabilityComponent } from './availability/availability.component';
import { Room_booking_Service } from './services/room_booking.service';
import { CreateRoomComponent } from './create-room/create-room.component';
import { MatSliderModule } from '@angular/material/slider';
import { MaterialModule } from './modules/material.module';
import { Room_Service } from './services/room.service';
import { DialogCreateRoomComponent } from './dialog-create-room/dialog-create-room.component';
import { DialogAvailabilityComponent } from './dialog-availability/dialog-availability.component';
import { DialogRoomBookingsComponent } from './dialog-room-bookings/dialog-room-bookings.component';
import { DialogUserDetailsComponent } from './dialog-user-details/dialog-user-details.component';

const ROUTES: Routes = [
  { path: "user", component: UserDetailsComponent },
  // {path:"home",component:AppComponent},
  // { path: "roomb", component: RoomBookingComponent },
  { path: "users", component: FindUsersComponent },
  { path: "available", component: AvailabilityComponent },
  { path: "create_room", component: CreateRoomComponent }

]
@NgModule({
  declarations: [AppComponent, AvailabilityComponent, DialogCreateRoomComponent, DialogAvailabilityComponent, DialogRoomBookingsComponent, DialogUserDetailsComponent],
  imports: [BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  
    RouterModule.forRoot(ROUTES),
    UserModule,
    RoomModule,
    ReactiveFormsModule,
    MatSliderModule,
    MaterialModule
  ],
  exports: [AvailabilityComponent, DialogCreateRoomComponent],
  providers: [Room_booking_Service,Room_Service],
  bootstrap: [AppComponent]
})

export class AppModule { }

