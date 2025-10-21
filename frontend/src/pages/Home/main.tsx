import { ShoppingItemForm } from '@/domain/shoppingList/components/ShoppingItemForm';
import { ShoppingItemList } from '@/domain/shoppingList/components/ShoppingItemList';

/**
 * @page HomePage
 * @summary Main home page displaying the shopping list application.
 * @domain shoppingList
 * @type page-component
 * @category shopping-list
 *
 * @routing
 * - Path: /
 * - Params: none
 * - Query: none
 *
 * @layout
 * - Layout: RootLayout
 * - Sections: Form, List
 *
 * @data
 * - Sources: Shopping items API
 * - Loading: Handled by child components
 * - Caching: 2 minutes stale time
 */
export const HomePage = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Lista de Compras</h1>
        <p className="text-gray-600">Organize suas compras de forma simples e eficiente</p>
      </div>

      <ShoppingItemForm />
      <ShoppingItemList />
    </div>
  );
};

export default HomePage;
