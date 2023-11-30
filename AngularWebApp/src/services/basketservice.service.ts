import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private basket: any[] = [];

  addToBasket(product: any) {
    // Check if the product is already in the basket
    const existingProduct = this.basket.find(item => item.id === product.id);

    if (existingProduct) {
      // If the product is already in the basket, increment the quantity
      existingProduct.quantity++;
    } else {
      // If the product is not in the basket, add it with a quantity of 1
      this.basket.push({ ...product, quantity: 1 });
    }
  }

  getBasket(): any[] {
    return this.basket;
  }

  clearBasket() {
    this.basket = [];
  }
}
