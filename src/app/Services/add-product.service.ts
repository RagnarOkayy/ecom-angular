import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {

  apiUrl = "https://localhost:7282/api/Product"

  constructor(private http: HttpClient) { }

  postProduct(productData : any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl, productData, {headers})
  }


}
