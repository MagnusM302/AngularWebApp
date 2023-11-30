import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientComponent } from './ingredient.component';

@NgModule({
  declarations: [IngredientComponent],
  exports: [IngredientComponent],
  imports: [CommonModule],
  providers: [],
})
export class IngredientModule { }
