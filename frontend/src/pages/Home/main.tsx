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
 */
export const HomePage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Bem-vindo à Lista de Compras</h2>
        <p className="text-gray-600 mb-6">
          Organize suas compras de forma simples e eficiente. Adicione itens, marque os que já foram
          comprados e mantenha tudo sob controle.
        </p>
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <p className="text-primary-800 text-sm">
            <strong>Dica:</strong> Comece adicionando seus primeiros itens à lista de compras!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
