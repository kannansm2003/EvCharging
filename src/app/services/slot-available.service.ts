import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SlotAvailableService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }

  getAvailableChargers(stationId: number): Observable<{ chargerId: number; type: string }[]> {
    return this.http.get<{ chargerId: number; type: string }[]>(`${this.baseUrl}/charger/byStation/${stationId}`);
  }

  getAvailableSlots(chargerId: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseUrl}/slots/available/${chargerId}`);
  }
}