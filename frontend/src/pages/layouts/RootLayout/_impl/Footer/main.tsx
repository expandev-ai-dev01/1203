/**
 * @component Footer
 * @summary Application footer with copyright information.
 * @domain core
 * @type layout-component
 * @category layout
 */
export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center text-sm text-gray-600">
          <p>&copy; {currentYear} Lista de Compras. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
