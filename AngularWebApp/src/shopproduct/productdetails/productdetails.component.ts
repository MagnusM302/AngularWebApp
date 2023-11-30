import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/product/product.interface'; // Import the Product interface

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent {

  product: Product; // Change 'any' to 'Product'

  constructor(
    public dialogRef: MatDialogRef<ProductdetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product } // Specify the type for 'data'
  ) {
    this.product = data.product;
  }

  closeDetails(): void {
    this.dialogRef.close();
  }
}
