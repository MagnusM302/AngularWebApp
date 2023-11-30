import { TestBed } from '@angular/core/testing';

import { IngredientproductService } from './ingredientproduct.service';

describe('IngredientproductService', () => {
  let service: IngredientproductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredientproductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
