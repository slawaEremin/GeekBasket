import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';


import { ProductItem, BasketItem } from '@shared/models';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private innerValue$ = new BehaviorSubject<BasketItem[]>([]);
  private innerDiscountValue$ = new BehaviorSubject<number>(0);

  public get value(): BasketItem[] {
    return this.innerValue$.getValue();
  }

  public get value$(): Observable<BasketItem[]> {
    return this.innerValue$.asObservable();
  }

  public get discount$(): Observable<number> {
    return this.innerDiscountValue$.asObservable();
  }

  public get count$(): Observable<number> {
    return this.value$
      .pipe(
        map((data: BasketItem[]) => data.reduce((res, item) => {
          res += item.quantity;
          return res;
        }, 0))
      )
  }

  public get subTotal$(): Observable<number> {
    return this.value$
      .pipe(
        map((data: BasketItem[]) => data.reduce((res, item) => {
          res += item.quantity * item.product.price;
          return res;
        }, 0)),
      )
  }

  public get subTotalRounded$(): Observable<string> {
    return this.subTotal$
      .pipe(
        map( value => value.toFixed(2))
      )
  }

  public get basketTotalRounded$(): Observable<string> {
    return combineLatest([
      this.subTotal$,
      this.discount$
    ])
      .pipe(
        map(([subTotal, discount]) => {
          return (subTotal - subTotal * discount/100).toFixed(2)
        })
      )
  }

  public add(product: ProductItem): void {
    const productIndex = this.findProductInBasket(product.sku);

    if (productIndex === -1) {
      const newProduct = {
        sku: product.sku,
        quantity: 1,
        product,
      } as BasketItem;

      this.innerValue$.next(this.value.concat(newProduct));
      return;
    }

    const productInBasket = this.value[productIndex];

    if (productInBasket.quantity === 10) {
      return;
    }

    productInBasket.quantity += 1;
    this.innerValue$.next(this.value.slice());
  }

  public remove(sku: number): void {
    const productIndex = this.findProductInBasket(sku);

    if (productIndex === -1) { return; }

    this.innerValue$.next([
      ...this.value.slice(0, productIndex),
      ...this.value.slice(productIndex+1),
    ]);
  }

  public changeCount(sku: number, quantityValue: number): void {
    const productIndex = this.findProductInBasket(sku);
    const productInBasket = this.value[productIndex];

    if (productIndex === -1) { return; }

    productInBasket.quantity = quantityValue;
    this.innerValue$.next(this.value.slice());
    return;
  }

  public setDiscount(value: number): void {
    this.innerDiscountValue$.next(value);
  }

  public clearDiscount(): void {
    this.innerDiscountValue$.next(0);
  }

  private findProductInBasket(sku: number): number {
    return this.value.findIndex((item: BasketItem) => item.sku === sku);
  }
}
