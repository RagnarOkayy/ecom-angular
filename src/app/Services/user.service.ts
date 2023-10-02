import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = "https://localhost:7282/api/User"

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`)
  }

  getUser(userId: number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${userId}`)
  }

  postUserChanges(userPayload: any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}`, userPayload)
  }

  //https://localhost:7282/api/User/changePassword
  changePassword(userId: number, oldPassword: string, newPassword: string ): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/changePassword?id=${userId}&oldPassword=${oldPassword}&newPassword=${newPassword}`, {})
  }

}
