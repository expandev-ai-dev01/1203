import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useEffect } from 'react';
import { Input } from '@/core/components/Input';
import { Button } from '@/core/components/Button';
import { useCreateShoppingItem } from '../../hooks/useCreateShoppingItem';
import type { ShoppingItemFormProps } from './types';

const shoppingItemSchema = z.object({
  name: z
    .string()
    .min(1, 'O nome do produto é obrigatório')
    .max(100, 'O nome do produto deve ter no máximo 100 caracteres')
    .regex(/^[a-zA-Z0-9\s]+$/, 'O nome do produto deve conter apenas letras, números e espaços'),
});

type ShoppingItemFormData = z.infer<typeof shoppingItemSchema>;

/**
 * @component ShoppingItemForm
 * @summary Form component for adding new shopping items
 * @domain shoppingList
 * @type domain-component
 * @category form
 *
 * @props
 * @param {Function} onSuccess - Callback when item is successfully created
 *
 * @features
 * - Real-time validation with Zod
 * - Automatic field clearing after submission
 * - Disabled state during submission
 * - Success notification display
 * - Focus management for sequential additions
 */
export const ShoppingItemForm = ({ onSuccess }: ShoppingItemFormProps) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setFocus,
  } = useForm<ShoppingItemFormData>({
    resolver: zodResolver(shoppingItemSchema),
    mode: 'onChange',
  });

  const { createItem, isCreating } = useCreateShoppingItem({
    onSuccess: (item) => {
      reset();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setFocus('name');
      onSuccess?.(item);
    },
  });

  const onSubmit = async (data: ShoppingItemFormData) => {
    try {
      await createItem(data);
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Adicionar Item</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          {...register('name')}
          label="Nome do Produto"
          placeholder="Digite o nome do produto"
          error={errors.name?.message}
          disabled={isCreating}
          maxLength={100}
          autoComplete="off"
        />

        <Button type="submit" disabled={!isValid || isCreating} fullWidth variant="primary">
          {isCreating ? 'Adicionando...' : 'Adicionar Item'}
        </Button>
      </form>

      {showSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg animate-fade-in">
          <p className="text-green-800 text-sm font-medium">Item adicionado com sucesso!</p>
        </div>
      )}
    </div>
  );
};
