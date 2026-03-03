import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {}

    private apiUrl = 'http://localhost:5000/api/login';


  login(body:any): Observable<any> {
    return this.http.post<any>(this.apiUrl, body);
  }

}
