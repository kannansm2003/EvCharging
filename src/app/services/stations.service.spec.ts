import { TestBed } from '@angular/core/testing';
import { SlotAvailableService } from './slot-available.service';
import { provideHttpClient } from '@angular/common/http';

describe('SlotAvailableService', () => {
  let service: SlotAvailableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()] 
    });
    service = TestBed.inject(SlotAvailableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
