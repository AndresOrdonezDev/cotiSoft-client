import { useState } from "react"
import { FiPlus, FiXCircle } from "react-icons/fi";
import UploadProductsModal from "../../components/admin/modals/UploadProductsModal";
import QuoteSearchClientBar from "../../components/admin/searchBars/QuoteSearchClientBar";
import { useMutation } from "@tanstack/react-query";
import { getClient } from "../../api/ClientAPI";
import { toast } from "react-toastify";
import type { Product } from "../../types/product";
import { formatCurrency } from "../../utils";

export default function CreateQuoteView() {
  const [showModalUploadProducts, setShowModalUploadProducts] = useState(false)
  const [searchInput, setSearchInput] = useState("")
  const [productsToQuote, setProductsToQuote] = useState<Product[]>([])

  const mutateSearchClient = useMutation({
    mutationFn: getClient,
    onError: (data) => toast.error(data.message),
    onSuccess: () => {
      setSearchInput("")
    }
  })
  const handleSearch = () => {
    mutateSearchClient.mutate(searchInput)
  }

  const handleAddProduct = (product: Product) => {
    console.log(product)
    setProductsToQuote(products => [...products, product])
    toast.success('Producto Agregado')
  }
  return (
    <div className="max-w-6xl mx-auto py-12 text-gray-700 ">
      <h1 className="text-2xl font-bold text-center">Nueva Cotización</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-20">
        <div>
          <h2 className="font-bold text-xl p-5">Buscar Cliente</h2>
          <QuoteSearchClientBar
            setSearchInput={setSearchInput}
            searchInput={searchInput}
            handleSearch={handleSearch}
          />
          {mutateSearchClient.data &&
            <>
              <div className="space-y-1 bg-white mt-10 p-5 rounded-lg">
                <h4 className="font-bold">{mutateSearchClient.data.fullname}</h4>
                <p>{mutateSearchClient.data.companyName}</p>
                <p>{mutateSearchClient.data.email}</p>
                <p className="font-bold">{mutateSearchClient.data.contact}</p>
              </div>
            </>}
          <div className="flex justify-end mt-5">
            <button
              disabled={mutateSearchClient.data ? false : true}
              onClick={() => setShowModalUploadProducts(true)}
              className={`uppercase font-semibold text-white cursor-pointer p-2 rounded-lg text-sm flex 
                ${mutateSearchClient.data ? 'hover:bg-teal-800 bg-teal-700 transition-all'
                  : 'bg-gray-400'
                }`}
            ><FiPlus size={18} />Agregar Productos</button>
          </div>

        </div>
        <div className="bg-white shadow-lg rounded-lg">
          {productsToQuote.length ? (<>
            <div className="p-5 flex items-center justify-between">
              <h2 className="font-bold text-xl">Productos Agregados:</h2>
              <button
                className="border text-sm font-semibold cursor-pointer border-slate-600 bg-slate-600 px-2 rounded text-white hover:bg-slate-700 hover:border-slate-700 transition-all"
              >Guardar y Enviar</button>
            </div>
            <div className="max-h-svh overflow-y-scroll pb-5">
              {productsToQuote.map(product => (
                <div
                  key={product.id}
                  className="px-5 py-2 border-2 border-gray-100 flex justify-between"
                >
                  <div className="flex flex-col w-full">
                    <p>{product.name}</p>
                    <p>{product.description}</p>
                    <p>{formatCurrency(product.price)}</p>
                  </div>
                  <div className="flex items-center gap-5">
                    <input
                      className="max-w-10 text-center border border-gray-700 rounded"
                      type="number"
                    />
                    <button className="text-red-600 cursor-pointer">
                      <FiXCircle size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </>) : (
            <p className="text-center mt-10">Aún no has agregado productos</p>
          )}
        </div>
      </div>
      {showModalUploadProducts &&
        <UploadProductsModal
          setShowModalUploadProducts={setShowModalUploadProducts}
          handleAddProduct={handleAddProduct}
        />
      }
    </div>
  )
}