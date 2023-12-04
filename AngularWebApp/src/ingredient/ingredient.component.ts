import { Component, Input, OnInit } from '@angular/core';
import { IngredientService } from '../services/ingredient.service';
import { Ingredient } from './ingredient.interface';
import { Ingredientproduct } from 'src/ingredientproduct/ingredientproduct.interface';
import { IngredientproductService } from '../services/ingredientproduct.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {
  private _productId: number | undefined;
  ingredients: Ingredient[] | undefined;

  @Input()
  set productId(value: number | undefined) {
    this._productId = value !== undefined ? +value : undefined;
  }

  get productId(): number | undefined {
    return this._productId;
  }

  ingredientProducts: Ingredientproduct[] = [];

  constructor(private ingredientService: IngredientService,
    private ingredientProductService: IngredientproductService
  ) { }

  ngOnInit(): void {
    if (this.productId !== undefined) {
      this.loadIngredients();
    }
  }

  loadIngredients() {
    if (this.productId !== undefined) {
      this.ingredientService.getIngredientsByProductId(this.productId).subscribe(
        (data: Ingredient[]) => {
          console.log('Ingredients:', data);
          this.ingredients = data;

          // Create an array of observables for each ingredient product request
          const requests = this.ingredients.map((ingredient) => {
            console.log('Fetching ingredient product for ingredient id:', ingredient.id);
            return this.ingredientProductService.getIngredientProductByIds(this.productId!, ingredient.id);
          });

          // Use forkJoin to wait for all requests to complete
          forkJoin(requests).subscribe(
            (ingredientProductsArray: Ingredientproduct[][]) => {
              // Flatten the array of arrays into a single array
              const flattenedIngredientProducts = ([] as Ingredientproduct[]).concat(...ingredientProductsArray);

              // Assuming you have only one corresponding Ingredientproduct for each ingredient, take the first one
              this.ingredientProducts = flattenedIngredientProducts.filter((product) => !!product);
            },
            (error: any) => {
              console.error('Error loading ingredient products. Please try again.', error);
            }
          );
        },
        (error: any) => {
          console.error('Error loading ingredients. Please try again.', error);
        }
      );
    }
  }

  getIngredientProduct(ingredient: Ingredient): Ingredientproduct {
    if (!ingredient || !this.productId) {
      return { count: 0, min: 0, max: 0, productId: 0, ingredientId: 0 }; // Return a default object if ingredient or productId is not available
    }

    const result = this.ingredientProducts.find(product => product.ingredientId === ingredient.id && product.productId === this.productId);
    return result || { count: 0, min: 0, max: 0, productId: this.productId, ingredientId: ingredient.id }; // Return a default object if not found
  }


  decreaseIngredientQuantity(ingredientProduct: Ingredientproduct): void {
    if (ingredientProduct && ingredientProduct.count > ingredientProduct.min) {
      ingredientProduct.count--;
    }
  }

  increaseIngredientQuantity(ingredientProduct: Ingredientproduct): void {
    if (ingredientProduct && ingredientProduct.count < ingredientProduct.max) {
      ingredientProduct.count++;
    }
  }
}
