import { FiSearch, FiPlus } from "react-icons/fi";
import { useProducts } from "../../hooks/UseProduct";
import { formatCurrency } from "../../utils";

export default function ProductsView() {
  const { data, isError, isLoading } = useProducts();

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error al consultar los productos</p>;

  if (data)
    return (
      <div className="w-full h-full bg-white p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-slate-700">Productos</h1>
          <button className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition">
            <FiPlus size={18} />
            Nuevo Producto
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mb-8">
          <input
            type="text"
            placeholder="Buscar por nombre o descripción..."
            className="w-full rounded-full border border-gray-300 bg-gray-50 px-5 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pr-12"
          />
          <FiSearch
            size={20}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          />
        </div>

        {/* Lista de Productos */}
        <div className="grid grid-cols-1 gap-2 lg:gap-1">
          {data.map((product) => (
            <div
              key={product.id}
              className="flex flex-col sm:flex-row sm:items-center border border-gray-200 rounded
              sm:justify-between px-5 py-4 hover:bg-gray-50 transition"
            >
              {/* Datos principales */}
              <div>
                <p className="font-medium text-slate-700">{product.name}</p>
                <p className="text-sm text-gray-500">{product.description}</p>
              </div>

              {/* Datos secundarios */}
              <div className="mt-2 sm:mt-0 flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-600">
                <span>{formatCurrency(product.price)}</span>
                <span>Stock: {product.stock}</span>
                <span>IVA: {product.tax}%</span>
                <div className="space-x-3">
                  <button
                    className="border rounded-lg px-2 cursor-pointer text-gray-950 bg-amber-400 border-amber-400"
                  >Editar</button>
                  <button
                    className="border rounded-lg px-2 cursor-pointer text-gray-950 bg-rose-300 border-rose-300"
                  >Eliminar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}
