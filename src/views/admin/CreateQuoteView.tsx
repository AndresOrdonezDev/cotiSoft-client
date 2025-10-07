import { useEffect, useState } from "react"
import { FiPlus } from "react-icons/fi";
import UploadProductsModal from "../../components/admin/modals/UploadProductsModal";
import QuoteSearchClientBar from "../../components/admin/searchBars/QuoteSearchClientBar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getClient } from "../../api/ClientAPI";
import { toast } from "react-toastify";
import type { ProductQuote } from "../../types/product";
import QuoteProductCard from "../../components/admin/cards/QuoteProductCard";
import type { QuoteProductsForm } from "../../types/quote";
import { createQuote } from "../../api/QuoteAPI";
import { formatCurrency } from "../../utils";
import { useNavigate } from "react-router-dom";

export default function CreateQuoteView() {
  const [showModalUploadProducts, setShowModalUploadProducts] = useState(false)
  const [searchInput, setSearchInput] = useState("")
  const [productsToQuote, setProductsToQuote] = useState<ProductQuote[]>([])
  const [totalQuote, setTotalQuote] = useState(0)
  const [notes,setNotes] = useState("")
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const mutateSearchClient = useMutation({
    mutationFn: getClient,
    onError: (data) => toast.error(data.message),
    onSuccess: () => {
      setSearchInput("")
    }
  })
  const handleSearch = () => {
    if(!searchInput)return toast.warn('Ingrese el valor a buscar')
    mutateSearchClient.mutate(searchInput)
  }
  const handleAddProduct = (product: ProductQuote) => {
    const productExistOnQuote = productsToQuote.some(p => p.product_id === product.product_id)
    if (productExistOnQuote) return increaseQuantity(product.product_id)
    setProductsToQuote(products => [...products, product])
    toast.success('Producto Agregado')
  }
  const increaseQuantity = (id: ProductQuote['product_id']) => {
    const updateList = productsToQuote.map(product => {
      if (product.product_id === id) {
        return {
          ...product,
          quantity: product.quantity + 1
        };
      }

      return product;
    });
    setProductsToQuote(updateList);
    //localStorage.setItem("quote", JSON.stringify(updateList))
  };
  useEffect(() => {
    const total = productsToQuote.reduce((total, product) => (product.price * product.quantity) + total, 0)
    setTotalQuote(total)
  }, [productsToQuote])

  const { mutate } = useMutation({
    mutationFn: createQuote,
    onError: (data) => toast.error(data.message),
    onSuccess: (data) => {
      toast.success(data.message)
      setProductsToQuote([])
      setNotes("")
      mutateSearchClient.reset()
      queryClient.invalidateQueries({queryKey: ["quotes"]})
      navigate(`?modalQuoteDownload=true&quoteId=${data.quoteId}`)
    }
  })
  const handleSendQuote = () => {
    const { data } = mutateSearchClient
    if (!data) return toast.error("Error al tomar el cliente")
    const dataQuote: QuoteProductsForm = {
      client_id: mutateSearchClient.data.id,
      notes,
      total: totalQuote,
      products: productsToQuote
    }
    mutate(dataQuote)
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
          <div className="flex justify-end mt-5 gap-5">
            {productsToQuote.length > 0 && <button
              onClick={handleSendQuote}
              className="border text-sm font-semibold cursor-pointer border-slate-600 bg-slate-600 px-2 rounded-lg text-white hover:bg-slate-700 hover:border-slate-700 transition-all"
            >Guardar y Enviar</button>}
            <button
              disabled={mutateSearchClient.data ? false : true}
              onClick={() => setShowModalUploadProducts(true)}
              className={`uppercase font-semibold text-white cursor-pointer p-2 rounded-lg text-sm flex 
                ${mutateSearchClient.data ? 'hover:bg-teal-800 bg-teal-700 transition-all'
                  : 'bg-gray-400'
                }`}
            ><FiPlus size={18} />Agregar Productos</button>
          </div>
          {productsToQuote.length > 0 && <div>
            <input
              onChange={(e)=>setNotes(e.target.value)}
              className="w-full border-2 mt-5 rounded p-2"
              type="text"
              value={notes}
              placeholder="Observaciones"
            />
          </div>}

        </div>
        <div className="bg-white shadow-lg rounded-lg">
          {productsToQuote.length ? (<>
            <div className="p-5 flex items-center justify-between">
              <h2 className="font-bold text-xl">Productos Agregados:</h2>
              <div>
                <p>Total: <span className="text-sm font-semibold">{formatCurrency(totalQuote)}</span></p>
              </div>
            </div>
            <div className="max-h-svh overflow-y-scroll pb-5">
              {productsToQuote.map(product => (
                <QuoteProductCard
                  key={product.product_id}
                  product={product}
                  productsToQuote={productsToQuote}
                  setProductsToQuote={setProductsToQuote}
                  increaseQuantity={increaseQuantity}
                />
              ))}
            </div>
          </>) : (
            <p className="text-center my-10">Aún no has agregado productos</p>
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