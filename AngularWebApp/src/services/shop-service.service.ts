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
  /*
  // Fetch a single product by ID
  getProductById(id: number): Observable<Product> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Product>(url);
  }

  // Create a new product
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  // Update an existing product
  updateProduct(product: Product): Observable<Product> {
    const url = `${this.apiUrl}/${product.id}`;
    return this.http.put<Product>(url, product);
  }

  // Delete a product by ID
  deleteProduct(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
  */
}
