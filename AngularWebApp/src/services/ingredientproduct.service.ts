import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientproductService {

  private apiUrl = 'https://localhost:7046/api/ingredientproduct';

  constructor(private http: HttpClient) { }


}
