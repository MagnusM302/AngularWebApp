import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ShopListComponent } from './shop-list/shop-list.component';

@NgModule({
  declarations: [
    ShopComponent,
    ShopListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ShopModule { }
