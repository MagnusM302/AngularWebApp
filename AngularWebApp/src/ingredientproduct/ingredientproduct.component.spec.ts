import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientproductComponent } from './ingredientproduct.component';

describe('IngredientproductComponent', () => {
  let component: IngredientproductComponent;
  let fixture: ComponentFixture<IngredientproductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngredientproductComponent]
    });
    fixture = TestBed.createComponent(IngredientproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
