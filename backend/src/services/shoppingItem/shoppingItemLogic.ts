import { v4 as uuidv4 } from 'uuid';
import {
  CreateShoppingItemParams,
  CreateShoppingItemResult,
  ShoppingItem,
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

  // Update item
  shoppingItems[itemIndex] = {
    ...shoppingItems[itemIndex],
    ...updates,
    name: updates.name ? updates.name.trim() : shoppingItems[itemIndex].name,
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
