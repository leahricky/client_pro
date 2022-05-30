import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAvailabilityComponent } from './dialog-availability.component';

describe('DialogAvailabilityComponent', () => {
  let component: DialogAvailabilityComponent;
  let fixture: ComponentFixture<DialogAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAvailabilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
