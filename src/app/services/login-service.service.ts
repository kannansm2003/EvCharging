import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  private readonly apiUrl = `${environment.apiUrl}/user/login`;
  constructor(private readonly http: HttpClient) { }
  login(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.post(url, { username, password }, { responseType: 'json' });



  }
}
