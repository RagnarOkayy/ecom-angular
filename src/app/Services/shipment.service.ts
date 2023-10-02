import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export enum ShipmentStatus {
  Pending = 0,
  Shipping = 1,
  Shipped = 2,
  Cancelled = 3
}

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {

  private apiUrl = "https://localhost:7282/api/Shipment/"


  constructor(private http: HttpClient) { }
  
  getShipments(status: number): Observable<any[]> {
    console.log(`${this.apiUrl}${status}`)
    return this.http.get<any[]>(`${this.apiUrl}specificOrderType${status}`);
  }

  changeShipment(id: number, status: number): Observable<any> {
    const url = `${this.apiUrl}${id}?status=${status}`;
    return this.http.post(url, {});
  }

  cancellOrder(orderid: number): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}cancellOrder?orderid=${orderid}`, {})
  }
  //https://localhost:7282/api/Shipment/getByUser?userId=1&shipmentStatusNum=0
  getShipmentByUser(userId: number, status: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}getByUser?userId=${userId}&shipmentStatusNum=${status}`)
  }

}
