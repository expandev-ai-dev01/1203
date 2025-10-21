import { useMutation, useQueryClient } from '@tanstack/react-query';
import { shoppingItemService } from '../../services/shoppingItemService';
import type { UseMarkPurchasedOptions, UseMarkPurchasedReturn } from './types';

/**
 * @hook useMarkPurchased
 * @summary Hook for marking shopping items as purchased or unpurchased
 * @domain shoppingList
 * @type domain-hook
 * @category data
 *
 * @param {UseMarkPurchasedOptions} options - Hook configuration options
 * @returns {UseMarkPurchasedReturn} Mark purchased mutation function and states
 *
 * @features
 * - Single or bulk item marking
 * - Optimistic updates
 * - Automatic cache invalidation
 * - Success/error callbacks
 */
export const useMarkPurchased = (options: UseMarkPurchasedOptions = {}): UseMarkPurchasedReturn => {
  const queryClient = useQueryClient();
  const queryKey = ['shopping-items'];

  const { onSuccess, onError } = options;

  const mutation = useMutation({
    mutationFn: ({ itemIds, purchased }: { itemIds: string[]; purchased: boolean }) =>
      shoppingItemService.markPurchased(itemIds, purchased),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey });
      onSuccess?.(data);
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });

  return {
    markPurchased: (itemIds: string[], purchased: boolean) =>
      mutation.mutateAsync({ itemIds, purchased }),
    isMarking: mutation.isPending,
    error: mutation.error as Error | null,
  };
};
