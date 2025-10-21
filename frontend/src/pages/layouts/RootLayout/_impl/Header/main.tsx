import { Link } from 'react-router-dom';

/**
 * @component Header
 * @summary Application header with navigation and branding.
 * @domain core
 * @type layout-component
 * @category navigation
 */
export const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">Lista de Compras</h1>
          </Link>
        </div>
      </div>
    </header>
  );
};
