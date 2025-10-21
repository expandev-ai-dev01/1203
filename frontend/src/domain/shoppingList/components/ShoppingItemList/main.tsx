import { useState, useMemo } from 'react';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { ErrorMessage } from '@/core/components/ErrorMessage';
import { Button } from '@/core/components/Button';
import { useShoppingItems } from '../../hooks/useShoppingItems';
import { useMarkPurchased } from '../../hooks/useMarkPurchased';
import { ShoppingItemCard } from './_impl/ShoppingItemCard';

/**
 * @component ShoppingItemList
 * @summary Displays list of shopping items with loading, error states, and bulk actions
 * @domain shoppingList
 * @type domain-component
 * @category display
 *
 * @features
 * - Automatic data fetching
 * - Loading state display
 * - Error handling with retry
 * - Empty state message
 * - Sorted by status (pending first, then purchased)
 * - Item counters (purchased/pending)
 * - Selection mode for bulk actions
 * - Mark/unmark multiple items
 * - Visual feedback for bulk operations
 */
export const ShoppingItemList = () => {
  const { items, isLoading, error, refetch } = useShoppingItems();
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [showSuccessFeedback, setShowSuccessFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const { markPurchased, isMarking } = useMarkPurchased({
    onSuccess: (updatedItems) => {
      const count = updatedItems.length;
      const action = updatedItems[0]?.purchased ? 'marcados como comprados' : 'desmarcados';
      setFeedbackMessage(`${count} ${count === 1 ? 'item' : 'itens'} ${action} com sucesso!`);
      setShowSuccessFeedback(true);
      setTimeout(() => setShowSuccessFeedback(false), 3000);
      setSelectionMode(false);
      setSelectedItems(new Set());
    },
  });

  // Sort items: pending first, then purchased
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      if (a.purchased === b.purchased) {
        return a.position - b.position;
      }
      return a.purchased ? 1 : -1;
    });
  }, [items]);

  // Calculate counters
  const purchasedCount = useMemo(() => items.filter((item) => item.purchased).length, [items]);
  const pendingCount = useMemo(() => items.filter((item) => !item.purchased).length, [items]);

  const handleSelectionChange = (itemId: string) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleMarkSelected = async (purchased: boolean) => {
    if (selectedItems.size === 0) return;
    await markPurchased(Array.from(selectedItems), purchased);
  };

  const handleToggleSelectionMode = () => {
    setSelectionMode(!selectionMode);
    setSelectedItems(new Set());
  };

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
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Minha Lista</h2>
          <div className="flex gap-4 mt-1">
            <p className="text-sm text-gray-600">
              <span className="font-medium text-green-600">{purchasedCount}</span> comprados
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium text-primary-600">{pendingCount}</span> pendentes
            </p>
          </div>
        </div>
        <Button
          variant={selectionMode ? 'secondary' : 'outline'}
          size="small"
          onClick={handleToggleSelectionMode}
        >
          {selectionMode ? 'Cancelar' : 'Selecionar'}
        </Button>
      </div>

      {selectionMode && (
        <div className="mb-4 p-4 bg-primary-50 rounded-lg border border-primary-200">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-primary-900">
              {selectedItems.size}{' '}
              {selectedItems.size === 1 ? 'item selecionado' : 'itens selecionados'}
            </p>
            <div className="flex gap-2">
              <Button
                variant="primary"
                size="small"
                onClick={() => handleMarkSelected(true)}
                disabled={selectedItems.size === 0 || isMarking}
              >
                {isMarking ? 'Marcando...' : 'Marcar como comprados'}
              </Button>
              <Button
                variant="outline"
                size="small"
                onClick={() => handleMarkSelected(false)}
                disabled={selectedItems.size === 0 || isMarking}
              >
                {isMarking ? 'Desmarcando...' : 'Desmarcar'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {showSuccessFeedback && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg animate-fade-in">
          <p className="text-green-800 text-sm font-medium">{feedbackMessage}</p>
        </div>
      )}

      <div className="space-y-3">
        {sortedItems.map((item) => (
          <ShoppingItemCard
            key={item.id}
            item={item}
            selectionMode={selectionMode}
            isSelected={selectedItems.has(item.id)}
            onSelectionChange={handleSelectionChange}
          />
        ))}
      </div>
    </div>
  );
};
