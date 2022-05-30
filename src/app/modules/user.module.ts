import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { User_Service } from 'src/app/services/user.service';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RoomBookingComponent } from '../room-booking/room-booking.component';
import { AppModule } from '../app.module';
import { MaterialModule } from './material.module';
import { AvailabilityComponent } from '../availability/availability.component';
import { Routes } from '@angular/router';
import {MatDividerHarness} from '@angular/material/divider/testing';

const ROUTES: Routes = [
  { path: "available", component: AvailabilityComponent }]

@NgModule({
  declarations: [UserDetailsComponent,RoomBookingComponent
],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    ],

  providers:[User_Service,DatePipe,MatDividerHarness],
  exports:[UserDetailsComponent,RoomBookingComponent]
})

export class UserModule {

 }
