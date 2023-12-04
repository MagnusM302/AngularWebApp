import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from '../ingredient/ingredient.interface';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  private apiUrl = 'https://localhost:7046/api/ingredients';
  constructor(private http: HttpClient) { }

  getIngredientsByProductId(productId: number): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(`${this.apiUrl}/product/${productId}`);
  }
}
