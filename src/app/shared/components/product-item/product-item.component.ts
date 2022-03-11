import { ChangeDetectionStrategy, Input, Output, EventEmitter, Component, OnDestroy, OnInit } from '@angular/core';

import { ProductItem } from '@shared/models';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductItemComponent {
  @Input() public product: ProductItem;
  @Output() public addToBasket = new EventEmitter<ProductItem>();

  public onAddToBasket(): void {
    this.addToBasket.emit(this.product);
  }

}
