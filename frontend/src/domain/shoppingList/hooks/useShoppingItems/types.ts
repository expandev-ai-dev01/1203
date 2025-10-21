import type { ShoppingItem } from '../../types';

export type UseShoppingItemsReturn = {
  items: ShoppingItem[];
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;
  refetch: () => void;
};
