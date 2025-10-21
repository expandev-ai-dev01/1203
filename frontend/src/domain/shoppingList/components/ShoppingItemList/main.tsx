import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { ErrorMessage } from '@/core/components/ErrorMessage';
import { useShoppingItems } from '../../hooks/useShoppingItems';
import { ShoppingItemCard } from './_impl/ShoppingItemCard';

/**
 * @component ShoppingItemList
 * @summary Displays list of shopping items with loading and error states
 * @domain shoppingList
 * @type domain-component
 * @category display
 *
 * @features
 * - Automatic data fetching
 * - Loading state display
 * - Error handling with retry
 * - Empty state message
 * - Sorted by position
 */
export const ShoppingItemList = () => {
  const { items, isLoading, error, refetch } = useShoppingItems();

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <ErrorMessage
          title="Erro ao carregar itens"
          message="Não foi possível carregar a lista de compras. Tente novamente."
          onRetry={refetch}
        />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-gray-400 text-2xl">📝</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Lista vazia</h3>
        <p className="text-gray-600">Adicione seu primeiro item à lista de compras!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Minha Lista</h2>
      <div className="space-y-3">
        {items.map((item) => (
          <ShoppingItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
