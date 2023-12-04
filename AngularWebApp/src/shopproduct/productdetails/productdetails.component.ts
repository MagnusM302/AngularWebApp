import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/product/product.interface';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent {
  @Output() productAddedToBasket = new EventEmitter<Product>();
  product: Product;

  constructor(
    public dialogRef: MatDialogRef<ProductdetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product }
  ) {
    this.product = data.product;
  }

  closeDetails(): void {
    this.dialogRef.close();
  }

  addToBasket(): void {
    const productToAdd: Product = this.data.product;

    console.log('Product to add to basket:', productToAdd);
    this.productAddedToBasket.emit(productToAdd);

    // Close the dialog
    this.dialogRef.close(productToAdd); // Pass the product to the parent component
  }

}
