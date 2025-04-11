import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { BookingServiceService } from './booking-service.service';

describe('BookingServiceService', () => {
  let service: BookingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(BookingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
