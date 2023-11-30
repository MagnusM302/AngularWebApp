import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-productcategory',
  templateUrl: './productcategory.component.html',
  styleUrls: ['./productcategory.component.css']
})
export class ProductcategoryComponent {
  @Input() selectedCategory: string | null = null; // Add this line
  @Output() categorySelected: EventEmitter<{ category: string; shopId: number }> = new EventEmitter<{ category: string; shopId: number }>();
  @Output() selectedCategoryChange: EventEmitter<string | null> = new EventEmitter<string | null>();
  categories: string[] = [];
  loading: boolean = true;
  error: string | null = null;
  shopId: number | undefined;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.productService.getAllProductCategories().subscribe(
      (data: any) => {
        this.categories = data;
        this.loading = false;
        this.error = null;
      },
      (error: any) => {
        this.categories = [];
        this.loading = false;
        this.error = 'Error loading categories. Please try again.';
      }
    );
  }

  selectCategory(category: string) {
    this.selectedCategoryChange.emit(category);
    this.categorySelected.emit({ category, shopId: Number(this.shopId) });
  }
}
