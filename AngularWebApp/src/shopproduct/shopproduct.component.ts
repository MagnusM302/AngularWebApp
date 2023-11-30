import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/services/product.service';
import { ShopService } from '../services/shop.service';
import { BasketService } from 'src/services/basketservice.service';
import { Product } from 'src/product/product.interface';
import { Shop } from 'src/shop/shop.interface';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductdetailsComponent } from './productdetails/productdetails.component';

@Component({
  selector: 'app-shopproduct',
  templateUrl: './shopproduct.component.html',
  styleUrls: ['./shopproduct.component.css']
})
export class ShopproductComponent implements OnInit {
  shop: Shop | null = null;
  products: Product[] = [];
  selectedProduct: any | null = null;
  shopId: string | null = null;
  selectedCategory: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private shopService: ShopService,
    private basketService: BasketService,
    private dialog: MatDialog // Inject MatDialog
  ) { }

  ngOnInit(): void {
    this.shopId = this.route.snapshot.paramMap.get('id');

    if (this.shopId !== null) {
      // Fetch shop details
      this.shopService.getShopById(this.shopId).subscribe(
        (data) => {
          this.shop = data;
        },
        (error) => {
          console.error('Error fetching shop details:', error);
        }
      );

      // Fetch all products for the shop
      this.productService.getProductsByShopId(this.shopId).subscribe(
        (data) => {
          this.products = data;
        },
        (error) => {
          console.error('Error fetching products for the shop:', error);
        }
      );
      this.selectedCategory = 'AllProducts';

    } else {
      console.error('Shop ID is null');
    }
  }

  openProductDetails(product: Product) {
    const dialogConfig: MatDialogConfig = {
      data: { product: product },
      panelClass: 'dialog-class',
      height: '400px',
      width: '200px',
      hasBackdrop: true, // Ensure that the backdrop is present
    };

    const dialogRef = this.dialog.open(ProductdetailsComponent, dialogConfig);
  }

  filterProductsByCategoryAndShop(category: string, shopId: number) {
    if (shopId !== null) {
      if (category === 'AllProducts') {
        this.productService.getProductsByShopIdInt(shopId).subscribe(
          (data) => {
            this.products = data;
          },
          (error) => {
            console.error('Error fetching all products for the shop:', error);
          }
        );
      } else {
        // Fetch products by the selected category for the current shop
        this.productService.getProductsByCategoryAndShop(category, +shopId).subscribe(
          (data) => {
            this.products = data;
          },
          (error) => {
            console.error('Error fetching products by category and shop:', error);
          }
        );
      }
    } else {
      console.error('Shop ID is null');
    }

    console.log('Selected Category:', this.selectedCategory);
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    // Fetch products by the selected category for the current shop
    this.filterProductsByCategoryAndShop(category, +this.shopId!);
    console.log('Selected Category:', this.selectedCategory);
  }

}
