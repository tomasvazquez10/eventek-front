import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketDataComponent } from './ticket-data.component';

describe('TicketDataComponent', () => {
  let component: TicketDataComponent;
  let fixture: ComponentFixture<TicketDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TicketDataComponent]
    });
    fixture = TestBed.createComponent(TicketDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
