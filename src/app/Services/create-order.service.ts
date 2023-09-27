import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateOrderService {

  private apiUrl = "https://localhost:7282/api/"
  constructor(private http: HttpClient) { }

  postProduct(payload: any): Observable<any> {
    const url = `${this.apiUrl}Order/postProduct`; // Replace with your actual API endpoint for posting products

    return this.http.post(url, payload);
  }


}
