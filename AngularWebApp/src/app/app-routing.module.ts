import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from 'src/product/product-list/product-list.component';
import { ShopListComponent } from 'src/shop/shop-list/shop-list.component'
import { ShopproductComponent } from 'src/shopproduct/shopproduct.component'

const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'shops', component: ShopListComponent },
  { path: 'shops/:id', component: ShopproductComponent }, 
  { path: '', redirectTo: '/shops', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
