import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StationsComponent } from './stations.component';
import { StationService } from '../../app/services/stations.service';
import { of, throwError } from 'rxjs';
import { RouterModule } from '@angular/router';

class MockStationService {
  getNearestStations(latitude: number, longitude: number) {
    return of([
      { id: 1, location: 'Station 1' },
      { id: 2, location: 'Station 2' },
    ]);
  }
}

describe('StationsComponent', () => {
  let component: StationsComponent;
  let fixture: ComponentFixture<StationsComponent>;
  let stationService: MockStationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StationsComponent, RouterModule.forRoot([])], // ✅ Move StationsComponent to imports
      providers: [{ provide: StationService, useClass: MockStationService }],
    }).compileComponents();

    fixture = TestBed.createComponent(StationsComponent);
    component = fixture.componentInstance;
    stationService = TestBed.inject(
      StationService
    ) as unknown as MockStationService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get location on init', () => {
    spyOn(component, 'getLocation').and.callThrough();
    component.ngOnInit();
    expect(component.getLocation).toHaveBeenCalled();
  });

  it('should fetch nearest stations', () => {
    component.latitude = 12.9716;
    component.longitude = 77.5946;
    spyOn(stationService, 'getNearestStations').and.callThrough();
    component.getNearestStations();
    expect(stationService.getNearestStations).toHaveBeenCalledWith(
      12.9716,
      77.5946
    );
    expect(component.chargingStations.length).toBe(2);
  });

  it('should handle error when fetching nearest stations', () => {
    spyOn(stationService, 'getNearestStations').and.returnValue(
      throwError(() => new Error('Error fetching stations'))
    );
    component.latitude = 12.9716;
    component.longitude = 77.5946;
    component.getNearestStations();
    expect(component.errorMessage).toBe('Failed to load charging stations.');
  });

  it('should display charging stations', () => {
    component.chargingStations = [
      { id: 1, location: 'Station 1' },
      { id: 2, location: 'Station 2' },
    ];
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('.card').length).toBe(2);
    expect(compiled.querySelector('.card h2').textContent).toContain(
      'Station 1'
    );
  });
});
