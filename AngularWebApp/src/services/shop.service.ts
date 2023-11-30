import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Shop } from 'src/shop/shop.interface';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private apiUrl = 'https://localhost:7046/api/shop'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  // Fetch a list of shops from the API
  getShops(): Observable<Shop[]> {

    return this.http.get<Shop[]>(this.apiUrl);
  }

  getShopById(shopId: string): Observable<Shop> {
    return this.http.get<Shop>(`${this.apiUrl}/${shopId}`);
  }

}
