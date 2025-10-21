import type { ShoppingItem } from '../../types';

export type UseMarkPurchasedOptions = {
  onSuccess?: (items: ShoppingItem[]) => void;
  onError?: (error: Error) => void;
};

export type UseMarkPurchasedReturn = {
  markPurchased: (itemIds: string[], purchased: boolean) => Promise<ShoppingItem[]>;
  isMarking: boolean;
  error: Error | null;
};
