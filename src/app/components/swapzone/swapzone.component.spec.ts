import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapzoneComponent } from './swapzone.component';

describe('SwapzoneComponent', () => {
  let component: SwapzoneComponent;
  let fixture: ComponentFixture<SwapzoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SwapzoneComponent]
    });
    fixture = TestBed.createComponent(SwapzoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
