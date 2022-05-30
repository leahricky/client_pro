import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRoomBookingsComponent } from './dialog-room-bookings.component';

describe('DialogRoomBookingsComponent', () => {
  let component: DialogRoomBookingsComponent;
  let fixture: ComponentFixture<DialogRoomBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRoomBookingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRoomBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
