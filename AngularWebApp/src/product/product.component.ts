import { Component, Input } from '@angular/core';
import { Product } from './product.interface'; // Define the Product model class

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  @Input()
    product!: Product;
}
