import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChargingStationService {
  private readonly apiUrl = `${environment.apiUrl}/charging_stations`;

  constructor(private readonly http: HttpClient) { }

  getStationDetails(stationId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${stationId}`);
  }

  getAllStations(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
