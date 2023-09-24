import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {

  private apiUrl = "https://localhost:7282/api/Product/products?id="

  constructor(private http: HttpClient) { }

  getProduct(productId: number): Observable<any>{
    const url = `${this.apiUrl}${productId}`;
    return this.http.get(url);
  }
}
