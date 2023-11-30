import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  private apiUrl = 'https://localhost:7046/api/ingredients';
  constructor(private http: HttpClient) { }

  getIngredientsByProductId(productId: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/product/${productId}`);
  }
}
