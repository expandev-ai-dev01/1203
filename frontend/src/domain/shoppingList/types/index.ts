/**
 * @types ShoppingList Domain Types
 * @summary Type definitions for shopping list domain
 * @domain shoppingList
 * @category types
 */

export type ShoppingItem = {
  id: string;
  name: string;
  purchased: boolean;
  position: number;
  createdAt: string;
  purchasedAt?: string | null;
};

export type CreateShoppingItemDto = {
  name: string;
};

export type UpdateShoppingItemDto = {
  name?: string;
  purchased?: boolean;
};

export type ShoppingItemFormData = {
  name: string;
};

export type ShoppingItemListParams = {
  purchased?: boolean;
};

export type MarkPurchasedDto = {
  itemIds: string[];
  purchased: boolean;
};
