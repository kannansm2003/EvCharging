import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { SlotbookingsComponent } from './slotbookings.component';

describe('SlotbookingsComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]), // Replaces RouterTestingModule
        provideHttpClient(), // Replaces HttpClientTestingModule
      ],
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SlotbookingsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
