import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignUpServiceService {
  private readonly apiUrl = `${environment.apiUrl}/user/register`;
  constructor(private readonly http: HttpClient) { }
  register(username: string, phoneNo: string, password: string): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.post(url, { username, phoneNo, password });

  }
}
