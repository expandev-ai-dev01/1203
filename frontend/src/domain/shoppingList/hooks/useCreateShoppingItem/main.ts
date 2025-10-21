import { useMutation, useQueryClient } from '@tanstack/react-query';
import { shoppingItemService } from '../../services/shoppingItemService';
import type { UseCreateShoppingItemOptions, UseCreateShoppingItemReturn } from './types';

/**
 * @hook useCreateShoppingItem
 * @summary Hook for creating new shopping items with optimistic updates
 * @domain shoppingList
 * @type domain-hook
 * @category data
 *
 * @param {UseCreateShoppingItemOptions} options - Hook configuration options
 * @returns {UseCreateShoppingItemReturn} Create mutation function and states
 */
export const useCreateShoppingItem = (
  options: UseCreateShoppingItemOptions = {}
): UseCreateShoppingItemReturn => {
  const queryClient = useQueryClient();
  const queryKey = ['shopping-items'];

  const { onSuccess, onError } = options;

  const mutation = useMutation({
    mutationFn: shoppingItemService.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey });
      onSuccess?.(data);
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });

  return {
    createItem: mutation.mutateAsync,
    isCreating: mutation.isPending,
    error: mutation.error as Error | null,
  };
};
