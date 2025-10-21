import type { ShoppingItem, CreateShoppingItemDto } from '../../types';

export type UseCreateShoppingItemOptions = {
  onSuccess?: (item: ShoppingItem) => void;
  onError?: (error: Error) => void;
};

export type UseCreateShoppingItemReturn = {
  createItem: (data: CreateShoppingItemDto) => Promise<ShoppingItem>;
  isCreating: boolean;
  error: Error | null;
};
