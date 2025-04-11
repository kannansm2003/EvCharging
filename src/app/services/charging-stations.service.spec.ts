import { TestBed } from '@angular/core/testing';
import { ChargingStationService } from './charging-stations.service';
import { provideHttpClient } from '@angular/common/http'; 

describe('ChargingStationsService', () => {
  let service: ChargingStationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()] 
    });
    service = TestBed.inject(ChargingStationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
