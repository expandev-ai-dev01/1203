import { useQuery } from '@tanstack/react-query';
import { shoppingItemService } from '../../services/shoppingItemService';
import type { UseShoppingItemsReturn } from './types';

/**
 * @hook useShoppingItems
 * @summary Hook for fetching and managing shopping items list
 * @domain shoppingList
 * @type domain-hook
 * @category data
 *
 * @returns {UseShoppingItemsReturn} Shopping items data and loading states
 */
export const useShoppingItems = (): UseShoppingItemsReturn => {
  const queryKey = ['shopping-items'];

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey,
    queryFn: () => shoppingItemService.list(),
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  return {
    items: data || [],
    isLoading,
    isFetching,
    error: error as Error | null,
    refetch,
  };
};
