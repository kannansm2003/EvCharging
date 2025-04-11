import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StationsDetailsComponent } from './stations-details.component';
import { Router, ActivatedRoute } from '@angular/router'; // ✅ Combine imports
import { ChargingStationService } from '../../app/services/charging-stations.service';

describe('StationsDetailsComponent', () => {
  let component: StationsDetailsComponent;
  let fixture: ComponentFixture<StationsDetailsComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const chargingStationServiceSpy = jasmine.createSpyObj(
      'ChargingStationService',
      ['getStationDetails']
    );
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [StationsDetailsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '123' } } },
        },
        { provide: Router, useValue: routerSpy },
        {
          provide: ChargingStationService,
          useValue: chargingStationServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StationsDetailsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set active tab correctly', () => {
    component.setActiveTab('map');
    expect(component.activeTab).toBe('map');
  });

  it('should navigate to slot booking page', () => {
    component.goToSlotBooking();
    expect(router.navigate).toHaveBeenCalledWith(['/slotbooking']);
  });
});
