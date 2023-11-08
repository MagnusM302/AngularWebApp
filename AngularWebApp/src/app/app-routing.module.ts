import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from 'src/product/product-list/product-list.component';
import { ShopListComponent } from 'src/shop/shop-list/shop-list.component'

const routes: Routes = [
  { path: 'products', component: ProductListComponent }, // Add this route
  { path: 'shops', component: ShopListComponent }
  // You can add more routes here for other components
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
