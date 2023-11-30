import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Shopproduct } from 'src/shopproduct/shopproduct.interface';

@Injectable({
  providedIn: 'root'
})
export class ShopproductService {

  private apiUrl = 'https://localhost:7046/api/shopproduct/'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  // Fetch all products for the shop
  getShopproducts(): Observable<Shopproduct[]> {

    return this.http.get<Shopproduct[]>(this.apiUrl);
  }

  /*
  getShopProductsByShopId(shopId: number): Observable<Shopproduct[]> {
    const url = `${this.apiUrl}ByShopId/${shopId}`;
    return this.http.get<Shopproduct[]>(url);
  }
  */
}
