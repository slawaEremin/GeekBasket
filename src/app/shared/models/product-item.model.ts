import { BasketItem } from "@shared/models/basket-item.model";

export interface ProductItem {
  sku: number;
  name: string;
  description: string;
  price: number;
}
