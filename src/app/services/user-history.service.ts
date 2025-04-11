import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserHistoryService {
  private readonly apiUrl = `${environment.apiUrl}/bookings/history`;

  constructor(private readonly http: HttpClient) { }
  getBookingHistory(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}`);
  }
}
