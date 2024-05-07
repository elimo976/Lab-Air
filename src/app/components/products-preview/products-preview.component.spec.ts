import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsPreviewComponent } from './products-preview.component';

describe('ProductsPreviewComponent', () => {
  let component: ProductsPreviewComponent;
  let fixture: ComponentFixture<ProductsPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsPreviewComponent]
    });
    fixture = TestBed.createComponent(ProductsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
