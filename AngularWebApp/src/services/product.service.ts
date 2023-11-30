import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/product/product.interface';

@Injectable({
  providedIn: 'root', // This service is provided at the root level
})
export class ProductService {
  private apiUrl = 'https://localhost:7046/api/products'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  // Fetch a list of products from the API
  getProducts(): Observable<Product[]> {

    return this.http.get<Product[]>(this.apiUrl);
  }
  
  // Fetch a single product by ID
  getProductById(id: number): Observable<Product> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Product>(url);
  }

  getProductsByShopId(shopId: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/shops/${shopId}`);
  }

  getProductsByShopIdInt(shopId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/shops/${shopId}`);
  }

  getAllProductCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/categories`);
  }

  getProductsByCategoryAndShop(category: string, shopId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/categories/${category}/shop/${shopId}`);
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
  
}
