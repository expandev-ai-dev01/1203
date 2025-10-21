import type { ShoppingItem } from '../../types';

export type ShoppingItemFormProps = {
  onSuccess?: (item: ShoppingItem) => void;
};
