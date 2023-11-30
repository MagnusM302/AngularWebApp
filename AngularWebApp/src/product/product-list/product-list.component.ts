import { Component, OnInit } from '@angular/core';
import { Product } from 'src/product/product.interface';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading: boolean = true;
  error: string | null = null;

  ngOnInit() {
    this.loadProducts();
  }

  constructor(private productService: ProductService) { }

  loadProducts() {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
        this.loading = false;
        this.error = null;
      },
      (error) => {
        this.products = [];
        this.loading = false;
        this.error = 'Error loading products. Please try again.';
      }
    );
  }

  addToCart(product: Product) {
    // Implement the logic to add the selected product to the shopping cart here
    console.log(`Added product to cart: ${product.description}`);
  }
}
