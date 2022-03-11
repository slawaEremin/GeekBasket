import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { ProductsApiService } from '@shared/services';
import { ProductItem } from '@shared/models';
import { BasketService } from '@store/basket.service';

@Component({
  selector: 'app-catalog-container',
  templateUrl: './catalog-container.component.html',
  styleUrls: ['./catalog-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogContainerComponent implements OnInit {

  public products$: Observable<ProductItem[]>;
  public count$: Observable<number>;
  public title = 'Product List view';

  constructor(
    private productsApiService: ProductsApiService,
    private titleService: Title,
    private basketService: BasketService,
  ) {}

  ngOnInit(): void {
    this.products$ = this.productsApiService.getAll();
    this.count$ = this.basketService.count$;

    this.titleService.setTitle(this.title);
  }

  public trackByFn(index: unknown, item: ProductItem): number {
    return item.sku;
  }

  public onAddToBasket(product: ProductItem): void {
    this.basketService.add(product);
  }

}
