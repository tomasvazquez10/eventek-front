import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventekComponent } from './eventek.component';

describe('EventekComponent', () => {
  let component: EventekComponent;
  let fixture: ComponentFixture<EventekComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventekComponent]
    });
    fixture = TestBed.createComponent(EventekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
