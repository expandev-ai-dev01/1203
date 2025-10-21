import { cn } from '@/core/utils/cn';
import type { ShoppingItemCardProps } from './types';

/**
 * @component ShoppingItemCard
 * @summary Card component for displaying individual shopping item
 * @domain shoppingList
 * @type domain-component
 * @category display
 *
 * @props
 * @param {ShoppingItem} item - Shopping item data
 *
 * @features
 * - Visual distinction for purchased items
 * - Displays item name and creation date
 * - Responsive design
 */
export const ShoppingItemCard = ({ item }: ShoppingItemCardProps) => {
  const formattedDate = new Date(item.createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <div
      className={cn(
        'p-4 rounded-lg border-2 transition-colors',
        item.purchased
          ? 'bg-gray-50 border-gray-200'
          : 'bg-white border-primary-200 hover:border-primary-300'
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3
            className={cn(
              'font-medium',
              item.purchased ? 'text-gray-500 line-through' : 'text-gray-900'
            )}
          >
            {item.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">Adicionado em {formattedDate}</p>
        </div>
        {item.purchased && (
          <div className="ml-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              ✓ Comprado
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
