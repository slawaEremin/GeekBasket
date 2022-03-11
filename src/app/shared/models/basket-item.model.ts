import { ProductItem } from './product-item.model';

export interface BasketItem {
  sku: number;
  quantity: number;
  product: ProductItem;
}
