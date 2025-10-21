import { v4 as uuidv4 } from 'uuid';
import {
  CreateShoppingItemParams,
  CreateShoppingItemResult,
  ShoppingItem,
  MarkPurchasedParams,
} from './shoppingItemTypes';
import { AppError } from '@/utils/errors';

/**
 * @summary
 * In-memory storage for shopping items
 *
 * @description
 * Stores shopping items in memory as per NO DATABASE policy.
 * Data will be lost on server restart.
 */
let shoppingItems: ShoppingItem[] = [];

/**
 * @summary
 * Creates a new shopping item
 *
 * @function shoppingItemCreate
 * @module shoppingItem
 *
 * @param {CreateShoppingItemParams} params - Item creation parameters
 * @param {string} params.name - Product name
 *
 * @returns {Promise<CreateShoppingItemResult>} Created shopping item
 *
 * @throws {AppError} When name validation fails
 *
 * @example
 * const item = await shoppingItemCreate({ name: 'Leite' });
 */
export async function shoppingItemCreate(
  params: CreateShoppingItemParams
): Promise<CreateShoppingItemResult> {
  // Validate name is not empty
  if (!params.name || params.name.trim().length === 0) {
    throw new AppError('VALIDATION_ERROR', 'O nome do produto é obrigatório', 400);
  }

  // Validate name length
  if (params.name.length > 100) {
    throw new AppError(
      'VALIDATION_ERROR',
      'O nome do produto deve ter no máximo 100 caracteres',
      400
    );
  }

  // Validate alphanumeric and spaces only
  const alphanumericRegex = /^[a-zA-Z0-9\s]+$/;
  if (!alphanumericRegex.test(params.name)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'O nome do produto deve conter apenas letras, números e espaços',
      400
    );
  }

  // Generate unique ID
  const id = uuidv4();

  // Calculate position (last position + 1)
  const position =
    shoppingItems.length > 0 ? Math.max(...shoppingItems.map((item) => item.position)) + 1 : 1;

  // Create item with default values
  const newItem: ShoppingItem = {
    id,
    name: params.name.trim(),
    purchased: false,
    position,
    createdAt: new Date(),
    purchasedAt: null,
  };

  // Add to in-memory storage
  shoppingItems.push(newItem);

  return newItem;
}

/**
 * @summary
 * Lists all shopping items
 *
 * @function shoppingItemList
 * @module shoppingItem
 *
 * @returns {Promise<ShoppingItem[]>} List of shopping items ordered by position
 *
 * @example
 * const items = await shoppingItemList();
 */
export async function shoppingItemList(): Promise<ShoppingItem[]> {
  return shoppingItems.sort((a, b) => a.position - b.position);
}

/**
 * @summary
 * Gets a shopping item by ID
 *
 * @function shoppingItemGet
 * @module shoppingItem
 *
 * @param {string} id - Item ID
 *
 * @returns {Promise<ShoppingItem>} Shopping item
 *
 * @throws {AppError} When item not found
 *
 * @example
 * const item = await shoppingItemGet('123e4567-e89b-12d3-a456-426614174000');
 */
export async function shoppingItemGet(id: string): Promise<ShoppingItem> {
  const item = shoppingItems.find((item) => item.id === id);

  if (!item) {
    throw new AppError('NOT_FOUND', 'Item não encontrado', 404);
  }

  return item;
}

/**
 * @summary
 * Updates a shopping item
 *
 * @function shoppingItemUpdate
 * @module shoppingItem
 *
 * @param {string} id - Item ID
 * @param {Partial<ShoppingItem>} updates - Fields to update
 *
 * @returns {Promise<ShoppingItem>} Updated shopping item
 *
 * @throws {AppError} When item not found or validation fails
 *
 * @example
 * const item = await shoppingItemUpdate('123', { name: 'Leite Integral' });
 */
export async function shoppingItemUpdate(
  id: string,
  updates: Partial<Pick<ShoppingItem, 'name' | 'purchased'>>
): Promise<ShoppingItem> {
  const itemIndex = shoppingItems.findIndex((item) => item.id === id);

  if (itemIndex === -1) {
    throw new AppError('NOT_FOUND', 'Item não encontrado', 404);
  }

  // Validate name if provided
  if (updates.name !== undefined) {
    if (!updates.name || updates.name.trim().length === 0) {
      throw new AppError('VALIDATION_ERROR', 'O nome do produto é obrigatório', 400);
    }

    if (updates.name.length > 100) {
      throw new AppError(
        'VALIDATION_ERROR',
        'O nome do produto deve ter no máximo 100 caracteres',
        400
      );
    }

    const alphanumericRegex = /^[a-zA-Z0-9\s]+$/;
    if (!alphanumericRegex.test(updates.name)) {
      throw new AppError(
        'VALIDATION_ERROR',
        'O nome do produto deve conter apenas letras, números e espaços',
        400
      );
    }
  }

  /**
   * @rule {BR-002} Register date and time when marking item as purchased
   * @rule {BR-003} Clear date and time when unmarking item
   */
  const purchasedAt =
    updates.purchased !== undefined
      ? updates.purchased
        ? new Date()
        : null
      : shoppingItems[itemIndex].purchasedAt;

  // Update item
  shoppingItems[itemIndex] = {
    ...shoppingItems[itemIndex],
    ...updates,
    name: updates.name ? updates.name.trim() : shoppingItems[itemIndex].name,
    purchasedAt,
  };

  return shoppingItems[itemIndex];
}

/**
 * @summary
 * Deletes a shopping item
 *
 * @function shoppingItemDelete
 * @module shoppingItem
 *
 * @param {string} id - Item ID
 *
 * @returns {Promise<void>}
 *
 * @throws {AppError} When item not found
 *
 * @example
 * await shoppingItemDelete('123e4567-e89b-12d3-a456-426614174000');
 */
export async function shoppingItemDelete(id: string): Promise<void> {
  const itemIndex = shoppingItems.findIndex((item) => item.id === id);

  if (itemIndex === -1) {
    throw new AppError('NOT_FOUND', 'Item não encontrado', 404);
  }

  shoppingItems.splice(itemIndex, 1);
}

/**
 * @summary
 * Marks one or multiple shopping items as purchased or unpurchased
 *
 * @function shoppingItemMarkPurchased
 * @module shoppingItem
 *
 * @param {MarkPurchasedParams} params - Mark purchased parameters
 * @param {string[]} params.itemIds - Array of item IDs to update
 * @param {boolean} params.purchased - Purchase status to set
 *
 * @returns {Promise<ShoppingItem[]>} Updated shopping items
 *
 * @throws {AppError} When one or more items not found
 *
 * @rule {BR-001} Item can only have two states: purchased or pending
 * @rule {BR-002} Register date and time when marking item as purchased
 * @rule {BR-003} Clear date and time when unmarking item
 * @rule {BR-008} Apply same status to all selected items in bulk action
 * @rule {BR-009} Use same date and time for all items marked in bulk action
 *
 * @example
 * const items = await shoppingItemMarkPurchased({
 *   itemIds: ['123', '456'],
 *   purchased: true
 * });
 */
export async function shoppingItemMarkPurchased(
  params: MarkPurchasedParams
): Promise<ShoppingItem[]> {
  /**
   * @validation Verify all items exist before updating
   */
  const notFoundIds: string[] = [];
  const itemsToUpdate: ShoppingItem[] = [];

  for (const itemId of params.itemIds) {
    const item = shoppingItems.find((item) => item.id === itemId);
    if (!item) {
      notFoundIds.push(itemId);
    } else {
      itemsToUpdate.push(item);
    }
  }

  if (notFoundIds.length > 0) {
    throw new AppError('NOT_FOUND', `Itens não encontrados: ${notFoundIds.join(', ')}`, 404, {
      notFoundIds,
    });
  }

  /**
   * @rule {BR-009} Use same date and time for all items in bulk action
   */
  const purchasedAt = params.purchased ? new Date() : null;

  /**
   * @rule {BR-008} Apply same status to all selected items
   */
  const updatedItems: ShoppingItem[] = [];

  for (const item of itemsToUpdate) {
    const itemIndex = shoppingItems.findIndex((i) => i.id === item.id);
    if (itemIndex !== -1) {
      shoppingItems[itemIndex] = {
        ...shoppingItems[itemIndex],
        purchased: params.purchased,
        purchasedAt,
      };
      updatedItems.push(shoppingItems[itemIndex]);
    }
  }

  return updatedItems;
}
