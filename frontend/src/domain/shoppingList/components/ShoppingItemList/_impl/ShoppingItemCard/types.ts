import type { ShoppingItem } from '../../../../types';

export type ShoppingItemCardProps = {
  item: ShoppingItem;
  selectionMode?: boolean;
  isSelected?: boolean;
  onSelectionChange?: (itemId: string) => void;
};
