import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';


import { ProductsApiService, PromocodeApiService } from '@shared/services';
import { BasketItem, PromocodeResponse } from '@shared/models';
import { BasketService } from '@store/basket.service';

@Component({
  selector: 'app-checkout-container',
  templateUrl: './checkout-container.component.html',
  styleUrls: ['./checkout-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutContainerComponent implements OnInit {
  public basketProducts$: Observable<BasketItem[]>;
  public count$: Observable<number>;
  public subTotal$: Observable<string>;
  public basketTotal$: Observable<string>;
  public discount$: Observable<number>;
  public title = 'Basket / Checkout view';

  constructor(
    private productsApiService: ProductsApiService,
    private titleService: Title,
    private basketService: BasketService,
    private promocodeApiService: PromocodeApiService,
  ) {}

  ngOnInit(): void {
    this.basketProducts$ = this.basketService.value$;
    this.count$ = this.basketService.count$;
    this.subTotal$ = this.basketService.subTotalRounded$;
    this.discount$ = this.basketService.discount$;
    this.basketTotal$ = this.basketService.basketTotalRounded$;

    this.titleService.setTitle(this.title);
  }

  public trackByFn(index: unknown, item: BasketItem): number {
    return item.sku;
  }

  public onRemoveFromBasket(basketProduct: BasketItem): void {
    this.basketService.remove(basketProduct.sku);
  }

  public onChangeQuantity(quantity: number, basketProduct: BasketItem): void {
    this.basketService.changeCount(basketProduct.sku, quantity);
  }

  public onApplyPromocode(value: string): void {
    this.promocodeApiService.apply(value)
      .pipe(
        tap((data: PromocodeResponse) => {
          this.basketService.setDiscount(data?.amount);
        }),
        catchError(() => {
          this.basketService.clearDiscount();
          return of(null);
        })
      )
      .subscribe();
  }

}
