import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateOrderService {

  private apiUrl = "https://localhost:7282/api/Order/"
  constructor(private http: HttpClient) { }

  postProduct(payload: any): Observable<any> {
    const url = `${this.apiUrl}postProduct`; // Replace with your actual API endpoint for posting products

    return this.http.post(url, payload);
  }
//https://localhost:7282/api/Order/getByUser?userId=3
  getOrdersById(userid: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}getByUser?userId=${userid}`)
  }

}
