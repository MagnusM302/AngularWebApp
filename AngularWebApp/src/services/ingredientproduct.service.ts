import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredientproduct } from '../ingredientproduct/ingredientproduct.interface';

@Injectable({
  providedIn: 'root'
})
export class IngredientproductService {

  private apiUrl = 'https://localhost:7046/api/Ingredientproduct';

  constructor(private http: HttpClient) { }

  getIngredientProductByIds(productId: number, ingredientId: number): Observable<Ingredientproduct[]> {
    return this.http.get<Ingredientproduct[]>(`${this.apiUrl}/${productId}/${ingredientId}`);
  }


}
