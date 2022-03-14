import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SessionService } from './session.service';


@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private baseUrl = `${environment.apiUrl}/settings`;
  private httpHeaders: HttpHeaders = new HttpHeaders({
    'Authorization': `Bearer' ${this.sessionService.getToken()}`
  })
  
  
  constructor(
    private router: Router,
    private http: HttpClient,
    private sessionService: SessionService

  ) { }


  resetPassword(token: string, password: string, confirmPassword: string) {
    return this.http.put(`${this.baseUrl}`, { token, password, confirmPassword });
  }
}
