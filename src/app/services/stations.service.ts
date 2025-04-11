import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root' // Makes this service available throughout the app
})
export class StationService {
  private readonly apiUrl = `${environment.apiUrl}/charging_stations/nearest`;

  constructor(private readonly http: HttpClient) { }

  // Fetch the nearest charging stations based on user location
  getNearestStations(latitude: number, longitude: number): Observable<any[]> {
    const url = `${this.apiUrl}?latitude=${latitude}&longitude=${longitude}`;
    return this.http.get<any[]>(url);
  }
}

