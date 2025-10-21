import { useState } from 'react';
import { cn } from '@/core/utils/cn';
import { useMarkPurchased } from '../../../../hooks/useMarkPurchased';
import type { ShoppingItemCardProps } from './types';

/**
 * @component ShoppingItemCard
 * @summary Card component for displaying individual shopping item with purchase toggle
 * @domain shoppingList
 * @type domain-component
 * @category display
 *
 * @props
 * @param {ShoppingItem} item - Shopping item data
 * @param {boolean} selectionMode - Whether selection mode is active
 * @param {boolean} isSelected - Whether item is selected
 * @param {Function} onSelectionChange - Callback when selection changes
 *
 * @features
 * - Visual distinction for purchased items
 * - Interactive checkbox for marking as purchased
 * - Displays item name and creation date
 * - Shows purchase timestamp when applicable
 * - Selection mode for bulk actions
 * - Optimistic UI updates
 * - Responsive design
 */
export const ShoppingItemCard = ({
  item,
  selectionMode = false,
  isSelected = false,
  onSelectionChange,
}: ShoppingItemCardProps) => {
  const [isOptimisticPurchased, setIsOptimisticPurchased] = useState(item.purchased);
  const { markPurchased, isMarking } = useMarkPurchased({
    onSuccess: () => {
      // Success handled by query invalidation
    },
    onError: () => {
      // Revert optimistic update on error
      setIsOptimisticPurchased(item.purchased);
    },
  });

  const formattedDate = new Date(item.createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const formattedPurchasedDate = item.purchasedAt
    ? new Date(item.purchasedAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  const handleCheckboxChange = async () => {
    if (selectionMode) {
      onSelectionChange?.(item.id);
      return;
    }

    const newPurchasedState = !isOptimisticPurchased;
    setIsOptimisticPurchased(newPurchasedState);

    try {
      await markPurchased([item.id], newPurchasedState);
    } catch (error) {
      console.error('Error marking item:', error);
    }
  };

  return (
    <div
      className={cn(
        'p-4 rounded-lg border-2 transition-all duration-200',
        isOptimisticPurchased
          ? 'bg-gray-50 border-gray-200'
          : 'bg-white border-primary-200 hover:border-primary-300',
        selectionMode && isSelected && 'ring-2 ring-primary-500 border-primary-500',
        isMarking && 'opacity-60'
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          <input
            type="checkbox"
            checked={selectionMode ? isSelected : isOptimisticPurchased}
            onChange={handleCheckboxChange}
            disabled={isMarking}
            className={cn(
              'w-5 h-5 rounded border-2 transition-colors cursor-pointer',
              'focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
              isOptimisticPurchased
                ? 'border-green-500 bg-green-500 text-white'
                : 'border-gray-300 bg-white',
              isMarking && 'cursor-not-allowed',
              selectionMode && 'border-primary-500'
            )}
            aria-label={`Marcar ${item.name} como ${
              isOptimisticPurchased ? 'pendente' : 'comprado'
            }`}
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3
            className={cn(
              'font-medium transition-all duration-200',
              isOptimisticPurchased ? 'text-gray-500 line-through' : 'text-gray-900'
            )}
          >
            {item.name}
          </h3>
          <div className="flex flex-col gap-1 mt-1">
            <p className="text-sm text-gray-500">Adicionado em {formattedDate}</p>
            {isOptimisticPurchased && formattedPurchasedDate && (
              <p className="text-sm text-green-600">Comprado em {formattedPurchasedDate}</p>
            )}
          </div>
        </div>

        {isOptimisticPurchased && !selectionMode && (
          <div className="flex-shrink-0">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              ✓ Comprado
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
