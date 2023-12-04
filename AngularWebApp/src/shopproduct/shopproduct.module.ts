import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopproductComponent } from './shopproduct.component';
import { RouterModule } from '@angular/router';
import { IngredientModule } from 'src/ingredient/ingredient.module';
import { ProductModule } from 'src/product/product.module';
import { ProductcategoryComponent } from './productcategory/productcategory.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { BasketDialogComponent } from './basket-dialog/basket-dialog.component';



@NgModule({
  declarations: [ShopproductComponent, ProductcategoryComponent, ProductdetailsComponent, BasketDialogComponent],
  imports: [
    CommonModule,
    RouterModule, // Include RouterModule in the imports array
    IngredientModule,
    ProductModule
  ],
})
export class ShopproductModule { }
