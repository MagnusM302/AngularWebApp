import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/services/product.service';
import { ShopService } from '../services/shop.service';
import { BasketService } from 'src/services/basketservice.service';
import { Product } from 'src/product/product.interface';
import { ComboService } from 'src/services/combo.service';
import { Shop } from 'src/shop/shop.interface';
import { Combo } from 'src/combo/combo.interface';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { BasketDialogComponent } from './basket-dialog/basket-dialog.component';

@Component({
  selector: 'app-shopproduct',
  templateUrl: './shopproduct.component.html',
  styleUrls: ['./shopproduct.component.css']
})
export class ShopproductComponent implements OnInit {
  shop: Shop | null = null;
  products: Product[] = [];
  combos: Combo[] = [];
  selectedProduct: any | null = null;
  shopId: string | null = null;
  selectedCategory: string | null = null;
  basketItems: any;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private shopService: ShopService,
    private basketService: BasketService,
    private comboService: ComboService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.shopId = this.route.snapshot.paramMap.get('id');

    if (this.shopId !== null) {
      // Fetch shop details
      this.shopService.getShopById(this.shopId).subscribe(
        (data) => {
          this.shop = data;

          // Fetch all products for the shop
          this.productService.getProductsByShopId(this.shopId ?? '').subscribe(
            (productData) => {
              this.products = productData;

              // Fetch all combos for the shop
              this.comboService.getCombosByShopId(parseInt(this.shopId ?? '')).subscribe(
                (comboData) => {
                  this.combos = comboData;
                },
                (error: any) => {
                  console.error('Error fetching combos for the shop:', error);
                }
              );
            },
            (error: any) => {
              console.error('Error fetching products for the shop:', error);
            }
          );
        },
        (error: any) => {
          console.error('Error fetching shop details:', error);
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
      hasBackdrop: true
    };

    const dialogRef = this.dialog.open(ProductdetailsComponent, dialogConfig);

    // Subscribe to the afterClosed event to get the result when the dialog is closed
    dialogRef.afterClosed().subscribe(result => {
      if (result && 'id' in result) {
        this.basketService.addToBasket(result as Product);
      } else {
        // Add the product to the basket
        this.basketService.addToBasket(result);
      }
    });
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
      } else if (category === 'AllCombos') {
        this.comboService.getCombosByShopId(shopId).subscribe(
          (data) => {
            this.combos = data;
            console.log('Combos:', this.combos); // Log the combos for debugging
          },
          (error) => {
            console.error('Error fetching all combos for the shop:', error);
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

  openBasketDialog(): void {
    console.log('Basket Items:', this.basketItems);
    const dialogRef = this.dialog.open(BasketDialogComponent, {
      width: '400px', 
      height: '800px',
      data: { basketItems: this.basketService.getBasket() },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
    });
  }


}
