import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentComponent } from './payment.component';
import { ActivatedRoute, Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { BookingServiceService } from '../../app/services/booking-service.service';
import { of, throwError } from 'rxjs';

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockBookingService: jasmine.SpyObj<BookingServiceService>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockBookingService = jasmine.createSpyObj('BookingServiceService', ['placeBooking']);

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      const storageMock: Record<string, string> = {
        stationId: '1',
        selectedCharger: JSON.stringify({ chargerId: 101 }),
        slotNo: '3',
        userId: '42',
        stationLocation: 'Test Location',
      };
      return storageMock[key] ?? null;
    });

    await TestBed.configureTestingModule({
      imports: [PaymentComponent],
      providers: [
        provideHttpClient(),
        { provide: ActivatedRoute, useValue: { queryParams: of({ slot: 'Morning' }) } },
        { provide: Router, useValue: mockRouter },
        { provide: BookingServiceService, useValue: mockBookingService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the PaymentComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve values from localStorage and query params on init', () => {
    component.ngOnInit();
    expect(component.slot).toBe('3');
    expect(component.chargerId).toBe(101);
    expect(component.userId).toBe(42);
    expect(component.location).toBe('Test Location');
  });

  it('should process payment successfully and navigate home', () => {
    spyOn(window, 'alert');
    mockBookingService.placeBooking.and.returnValue(of({ success: true }));

    component.processPayment();

    expect(mockBookingService.placeBooking).toHaveBeenCalledWith(1, 101, 3, 42);
    expect(window.alert).toHaveBeenCalledWith('Payment Successful');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should show an error alert if booking fails', () => {
    spyOn(window, 'alert');
    mockBookingService.placeBooking.and.returnValue(throwError(() => new Error('API error')));

    component.processPayment();

    expect(window.alert).toHaveBeenCalledWith('Booking failed. Please try again.');
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should not proceed if booking details are incomplete', () => {
    spyOn(window, 'alert');

    // ✅ Instead of re-spying, modify the existing spy
    (localStorage.getItem as jasmine.Spy).and.callFake((key: string) => null);

    component.processPayment();

    expect(window.alert).toHaveBeenCalledWith('Booking details are incomplete. Please try again.');
    expect(mockBookingService.placeBooking).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
