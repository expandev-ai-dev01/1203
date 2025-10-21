/**
 * @types ShoppingItem Types
 * @summary Type definitions for shopping item domain
 * @domain shoppingItem
 * @category types
 */

export interface ShoppingItem {
  id: string;
  name: string;
  purchased: boolean;
  position: number;
  createdAt: Date;
  purchasedAt: Date | null;
}

export interface CreateShoppingItemParams {
  name: string;
}

export interface CreateShoppingItemResult {
  id: string;
  name: string;
  purchased: boolean;
  position: number;
  createdAt: Date;
  purchasedAt: Date | null;
}

export interface ShoppingItemListItem {
  id: string;
  name: string;
  purchased: boolean;
  position: number;
  createdAt: Date;
  purchasedAt: Date | null;
}

export interface MarkPurchasedParams {
  itemIds: string[];
  purchased: boolean;
}
