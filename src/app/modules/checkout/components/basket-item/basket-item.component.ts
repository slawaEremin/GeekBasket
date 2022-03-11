import {
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  Component,
  OnDestroy,
  OnInit,
  ViewChild, ElementRef
} from '@angular/core';

import { BasketItem } from '@shared/models';

@Component({
  selector: 'app-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasketItemComponent {
  @Input() public data: BasketItem;
  @Output() public removeItem = new EventEmitter<BasketItem>();
  @Output() public changeQuantity = new EventEmitter<number>();

  public values = [...Array(10).keys()].map( item => item + 1);

  public get linePrice(): string {
    return (this.data.product.price * this.data.quantity).toFixed(2);
  }

  public onRemove(): void {
    this.removeItem.emit(this.data);
  }

  public onChangeQuantity(event: any): void {
    this.changeQuantity.emit(parseInt(event.target.value, 10));
  }

  public trackByFn(index: any, item: any) {
    return item;
  }

}
