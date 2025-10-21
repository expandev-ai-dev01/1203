import { authenticatedClient } from '@/core/lib/api';
import type { ShoppingItem, CreateShoppingItemDto, UpdateShoppingItemDto } from '../types';

/**
 * @service shoppingItemService
 * @summary Shopping item management service for authenticated endpoints
 * @domain shoppingList
 * @type rest-service
 * @apiContext internal
 *
 * @description
 * All methods in this service use authenticatedClient which targets:
 * /api/v1/internal/shopping-item/...
 */
export const shoppingItemService = {
  /**
   * @endpoint GET /api/v1/internal/shopping-item
   * @summary Fetches list of shopping items
   */
  async list(): Promise<ShoppingItem[]> {
    const response = await authenticatedClient.get('/shopping-item');
    return response.data.data;
  },

  /**
   * @endpoint GET /api/v1/internal/shopping-item/:id
   * @summary Fetches single shopping item by ID
   */
  async getById(id: string): Promise<ShoppingItem> {
    const response = await authenticatedClient.get(`/shopping-item/${id}`);
    return response.data.data;
  },

  /**
   * @endpoint POST /api/v1/internal/shopping-item
   * @summary Creates new shopping item
   */
  async create(data: CreateShoppingItemDto): Promise<ShoppingItem> {
    const response = await authenticatedClient.post('/shopping-item', data);
    return response.data.data;
  },

  /**
   * @endpoint PUT /api/v1/internal/shopping-item/:id
   * @summary Updates existing shopping item
   */
  async update(id: string, data: UpdateShoppingItemDto): Promise<ShoppingItem> {
    const response = await authenticatedClient.put(`/shopping-item/${id}`, data);
    return response.data.data;
  },

  /**
   * @endpoint DELETE /api/v1/internal/shopping-item/:id
   * @summary Deletes shopping item
   */
  async delete(id: string): Promise<void> {
    await authenticatedClient.delete(`/shopping-item/${id}`);
  },
};
