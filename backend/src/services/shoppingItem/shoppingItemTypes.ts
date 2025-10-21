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
}

export interface ShoppingItemListItem {
  id: string;
  name: string;
  purchased: boolean;
  position: number;
  createdAt: Date;
}
