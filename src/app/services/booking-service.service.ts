import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {
  private readonly bookingUrl = `${environment.apiUrl}/bookings/placeBooking`;
  constructor(private readonly http: HttpClient) { }
  placeBooking(chargingStationId: number, chargerId: number, slotNo: number, userId: number): Observable<any> {
    const url = `${this.bookingUrl}?charging_station_id=${chargingStationId}&chargerId=${chargerId}&slot_no=${slotNo}&user_id=${userId}`;
    return this.http.post<any>(url, {});
  }//hi im kannan
}