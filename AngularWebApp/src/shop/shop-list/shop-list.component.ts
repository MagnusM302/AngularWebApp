import { Component, OnInit } from '@angular/core';
import { Shop } from '../shop.interface';
import { ShopService } from '../../services/shop.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit {
  shops: Shop[] = [];
  loading: boolean = true;
  error: string | null = null;

  ngOnInit() {
    this.loadShops();
  }

  constructor(private shopService: ShopService) { }

  loadShops() {
    this.shopService.getShops().subscribe(
      (data) => {
        this.shops = data;
        this.loading = false;
        this.error = null;
      },
      (error) => {
        this.shops = [];
        this.loading = false;
        this.error = 'Error loading products. Please try again.';
      }
    );
  }

}
