/**
 * @module shoppingList
 * @summary Shopping list domain module for managing shopping items
 * @domain shoppingList
 * @dependencies TanStack Query, React Hook Form, Zod
 * @version 1.0.0
 * @author Development Team
 * @lastModified 2025-01-21
 */

// Domain public exports - Components
export * from './components/ShoppingItemForm';
export * from './components/ShoppingItemList';

// Domain public exports - Hooks
export * from './hooks/useShoppingItems';
export * from './hooks/useCreateShoppingItem';
export * from './hooks/useMarkPurchased';

// Domain public exports - Services
export * from './services/shoppingItemService';

// Domain public exports - Types
export * from './types';

// Module metadata
export const moduleMetadata = {
  name: 'shoppingList',
  domain: 'functional',
  version: '1.0.0',
  publicComponents: ['ShoppingItemForm', 'ShoppingItemList'],
  publicHooks: ['useShoppingItems', 'useCreateShoppingItem', 'useMarkPurchased'],
  publicServices: ['shoppingItemService'],
  dependencies: {
    internal: ['@/core/components', '@/core/lib', '@/core/utils'],
    external: ['react', 'react-hook-form', 'zod', '@tanstack/react-query'],
    domains: [],
  },
  exports: {
    components: ['ShoppingItemForm', 'ShoppingItemList'],
    hooks: ['useShoppingItems', 'useCreateShoppingItem', 'useMarkPurchased'],
    services: ['shoppingItemService'],
    types: ['ShoppingItem', 'CreateShoppingItemDto', 'ShoppingItemFormData', 'MarkPurchasedDto'],
  },
} as const;
