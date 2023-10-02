import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = "https://localhost:7282/api/User/"

  constructor(private http : HttpClient) { }

  login(loginObj : any){

    return this.http.post<any>(`${this.apiUrl}login`, loginObj);

  }

  register(registerObj: any){
    
    return this.http.post<any>(`${this.apiUrl}register`, registerObj)

  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }



}
