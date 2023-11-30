import { Component, Input, OnInit } from '@angular/core';
import { IngredientService } from '../services/ingredient.service';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {
  private _productId: number | undefined;

  @Input()
  set productId(value: number | undefined) {
    // Assign the parsed number value or undefined
    this._productId = value !== undefined ? +value : undefined;
  }

  get productId(): number | undefined {
    return this._productId;
  }

  ingredients: any[] = []; // Replace 'any' with your actual ingredient interface

  constructor(private ingredientService: IngredientService) { }

  ngOnInit(): void {
    // Check if productId is not undefined before calling loadIngredients
    if (this.productId !== undefined) {
      this.loadIngredients();
    }
  }

  loadIngredients() {
    // Check if productId is not undefined before making the API call
    if (this.productId !== undefined) {
      this.ingredientService.getIngredientsByProductId(this.productId).subscribe(
        (data) => {
          this.ingredients = data;
        },
        (error) => {
          console.error('Error loading ingredients. Please try again.', error);
        }
      );
    }
  }
}
