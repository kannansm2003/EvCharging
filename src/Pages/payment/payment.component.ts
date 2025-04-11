import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserHistoryService } from '../../app/services/user-history.service';
import { BookingServiceService } from '../../app/services/booking-service.service';

@Component({
  selector: 'app-payment',
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

  userName: string = '';
  phoneNo: string = '';
  date: string = new Date().toLocaleDateString();
  time: string = new Date().toLocaleTimeString();
  slot: string | null = '';
  chargerId:number | null=null;
  userId : number | null=null;
  location:string|null='';

  constructor(private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly bookingService:BookingServiceService,
    private readonly historyService: UserHistoryService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.slot = params['slot'] || 'N/A';
    });
    const selectedCharger = localStorage.getItem('selectedCharger');
    if (selectedCharger) {
      const charger = JSON.parse(selectedCharger);
      this.chargerId = charger.chargerId;
    }
    const slotNo = localStorage.getItem('slotNo');
    if (slotNo) {
      this.slot = slotNo;
    }
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userId = Number(userId);
    }
    const location = localStorage.getItem('stationLocation');
    if (location) {
      this.location = location;
    }
  }

  processPayment() {
    this.bookSlot();
  }
  bookSlot(): void {
    const stationId = parseInt(localStorage.getItem('stationId') ?? '0', 10);
  
    if (stationId && this.chargerId && this.slot !== null && this.userId) {
      console.log('Booking with Charger ID:', this.chargerId);
  
      this.bookingService
        .placeBooking(stationId, this.chargerId, Number(this.slot), this.userId)
        .subscribe({
          next: (response) => {
            console.log('Booking successful:', response);
            alert('Payment Successful');
            this.router.navigate(['/']);
          },
          error: (error) => {
            console.error('Error placing booking:', error);
            alert('Booking failed. Please try again.');
          },
        });
    } else {
      alert('Booking details are incomplete. Please try again.');
    }
  }
  
}
