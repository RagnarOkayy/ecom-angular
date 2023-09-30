import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {

  private apiUrl = "https://localhost:7282/api/Product"

  constructor(private http: HttpClient) { }

  postProduct(payload: any): Observable<any> {
    const url = `${this.apiUrl}`;

    return this.http.post(url, payload);
  }

}
