import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Combo } from 'src/combo/combo.interface';

@Injectable({
  providedIn: 'root'
})
export class ComboService {

  private apiUrl = 'https://localhost:7046/api/combo'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  getCombosByCategoryAndShop(shopId: number): Observable<Combo[]> {
    return this.http.get<Combo[]>(`${this.apiUrl}/shop/${shopId}`);
  }
}
