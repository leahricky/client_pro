import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Room_Service } from 'src/app/services/room.service';
import { Room_booking_Service } from 'src/app/services/room_booking.service';
import {  ReactiveFormsModule } from '@angular/forms';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { FindUsersComponent } from '../find-users/find-users.component';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import {  CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { AvailabilityComponent } from '../availability/availability.component';
import { Room_booking } from '../models/room_booking.model';
import { RoomBookingComponent } from '../room-booking/room-booking.component';
import { UserModule } from './user.module';
import { MatDialogModule} from '@angular/material/dialog';
import { CreateRoomComponent } from '../create-room/create-room.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { Routes } from '@angular/router';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} 
      from '@angular/platform-browser/animations';
  
  


@NgModule({
  declarations: [FindUsersComponent,CreateRoomComponent],
  imports: [CommonModule,
    ReactiveFormsModule,
     TableModule,
     CalendarModule,
     SliderModule,
     DialogModule,
     MultiSelectModule,
     ContextMenuModule,
     DropdownModule,
     ButtonModule,
     ToastModule,
     InputTextModule,
     ProgressBarModule,
     UserModule,
     MatDialogModule,
     MaterialModule,
     ConfirmDialogModule,
     BrowserModule,
     BrowserAnimationsModule
     
  ],
  exports:[FindUsersComponent,CreateRoomComponent],
  providers:[Room_Service,MessageService,ConfirmationService]
})
export class RoomModule {

 }
