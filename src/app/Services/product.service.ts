import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = "https://localhost:7282/api/" 

  constructor( private http: HttpClient) { }

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}Product/productWithCategory`);
  }

  getAllProductCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}ProductCategory`);
  }

}
