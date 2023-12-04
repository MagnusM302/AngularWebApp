import { NgModule } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BasketService } from 'src/services/basketservice.service';

@Component({
  selector: 'app-basket-dialog',
  templateUrl: './basket-dialog.component.html',
  styleUrls: ['./basket-dialog.component.css']
})

export class BasketDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<BasketDialogComponent>,
    private basketService: BasketService 
  ) { }

  closeDialog(): void {
    this.dialogRef.close();
  }

  clearBasket(): void {
    this.basketService.clearBasket();
    this.data.basketItems = [];  // Assuming you also want to clear the items in the dialog data
  }

}
