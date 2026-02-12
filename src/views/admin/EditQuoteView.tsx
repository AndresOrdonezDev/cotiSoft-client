import { useEffect, useState } from "react"
import { FiPlus, FiTrash } from "react-icons/fi";
import UploadProductsModal from "../../components/admin/modals/UploadProductsModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ProductQuote } from "../../types/product";
import QuoteProductCard from "../../components/admin/cards/QuoteProductCard";
import { formatCurrency } from "../../utils";
import { useNavigate, useParams } from "react-router-dom";
import { deleteQuote, getQuoteById, updateQuote } from "../../api/QuoteAPI";
import { getClient } from "../../api/ClientAPI";
import { toast } from "react-toastify";
import QuoteSearchClientBar from "../../components/admin/searchBars/QuoteSearchClientBar";
import type { QuoteProductsForm } from "../../types/quote";

export default function EditQuoteView() {
    const [showModalUploadProducts, setShowModalUploadProducts] = useState(false)
    const [productsToQuote, setProductsToQuote] = useState<ProductQuote[]>([])
    const [totalQuote, setTotalQuote] = useState(0)
    const [notes, setNotes] = useState("")
    const [searchInput, setSearchInput] = useState("")
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { id } = useParams()// /quotes/edit/:id

    const { data, isLoading, isError } = useQuery({
        queryKey: ['quoteEdit', id],
        queryFn: () => getQuoteById(+id!)
    })
    const mutateSearchClient = useMutation({
        mutationFn: getClient,
        onError: (data) => toast.error(data.message),
        onSuccess: () => {
            setSearchInput("")
        }
    })
    const handleSearch = () => {
        if (!searchInput) return toast.warn('Ingrese el valor a buscar', { toastId: 'noValue' })
        mutateSearchClient.mutate(searchInput)
    }
    useEffect(() => {
        if (data) {
            const formattedProducts = data.quoteProducts.map((item) => ({
                name: item.products.name,
                description: item.products.description,
                price: item.price,
                tax: item.tax,
                quantity: item.quantity,
                product_id: item.product_id,
            }));
            setProductsToQuote(formattedProducts);
            setNotes(data.notes ? data.notes : '')
            mutateSearchClient.mutate(data.client.email)
        }
    }, [data])

    useEffect(() => {
        const total = productsToQuote.reduce((total, product) => (product.price * product.quantity) + total, 0)
        setTotalQuote(total)
    }, [productsToQuote])

    const handleAddProduct = (product: ProductQuote) => {
        const productExistOnQuote = productsToQuote.some(p => p.product_id === product.product_id)
        if (productExistOnQuote) return increaseQuantity(product.product_id)
        setProductsToQuote(products => [...products, product])
        toast.success('Producto Agregado', { toastId: 'addProduct' })
    }

    const increaseQuantity = (id: ProductQuote['product_id']) => {
        const updateList = productsToQuote.map(product => {
            if (product.product_id === id) {
                return { ...product, quantity: product.quantity + 1 }
            }
            return product
        })
        setProductsToQuote(updateList)
    }

    //update product, send info to api
    const { mutate } = useMutation({
        mutationFn: updateQuote,
        onError: (data) => toast.error(data.message),
        onSuccess: (data) => {
            toast.success(data.message)
            setProductsToQuote([])
            setNotes("")
            queryClient.invalidateQueries({ queryKey: ["quotes"] })
            mutateSearchClient.reset()
            navigate('/')
            navigate('?modalQuoteDownload=true', {
                state: {
                    id: data.quoteId,
                    client: mutateSearchClient.data?.fullname,
                    email: mutateSearchClient.data?.email
                }
            })
        }
    })

    const mutationDeleteQuote = useMutation({
        mutationFn:deleteQuote,
        onError:(data)=> toast.error(data.message),
        onSuccess:(data)=>{
            toast.success(data.message)
            setProductsToQuote([])
            setNotes("")
            queryClient.invalidateQueries({ queryKey: ["quotes"] })
            mutateSearchClient.reset()
            navigate('/')
        }
    })

    const handleSendQuote = () => {
        const { data } = mutateSearchClient
        if (!data) return toast.error("Error al tomar el cliente")
        const dataQuote:QuoteProductsForm = { 
            client_id: mutateSearchClient.data.id,
            notes,
            total: totalQuote,
            products: productsToQuote,
            
        }
        const dataUpdate =  {
            id:+id!,
            formData:dataQuote
        }
        mutate(dataUpdate)
    }

    const handleDeleteQuote = ()=>{
        if(!id) return toast.error("No hay una cotización seleccionada")
        if(confirm(`Desea eliminar la cotización No. ${id}`)){
           mutationDeleteQuote.mutate(+id)
        }
    }
    if (isLoading) return <p>Cargando..</p>
    if (isError) return <p>Error al traer los datos</p>
    if (data) return (
        <div className="max-w-6xl mx-auto py-12 text-gray-700 ">
            <h1 className="text-2xl font-bold text-center">Editar Cotización</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-20">
                <div>
                    <h2 className="font-bold text-xl p-5">Buscar y Cambiar cliente</h2>
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
                        
                        {productsToQuote.length > 0 && id &&<button
                            onClick={()=>handleDeleteQuote()}
                            className="border text-sm font-semibold cursor-pointer border-rose-600 bg-rose-600 px-2 rounded-lg text-white hover:bg-rose-700 hover:border-rose-700 transition-all"
                        ><FiTrash/></button>}
                        {productsToQuote.length > 0 && <button
                            onClick={()=>handleSendQuote()}
                            className="border text-sm font-semibold cursor-pointer border-slate-600 bg-slate-600 px-2 rounded-lg text-white hover:bg-slate-700 hover:border-slate-700 transition-all"
                        >Guardar Cambios</button>}
                        <button
                            onClick={() => setShowModalUploadProducts(true)}
                            className="uppercase font-semibold text-white cursor-pointer p-2 rounded-lg text-sm flex hover:bg-teal-800 bg-teal-700 transition-all"
                        ><FiPlus size={18} />Agregar Productos</button>
                    </div>

                    {productsToQuote.length > 0 && (
                        <div>
                            <input
                                onChange={(e) => setNotes(e.target.value)}
                                className="w-full border-2 mt-5 rounded p-2"
                                type="text"
                                value={notes}
                                placeholder="Observaciones"
                            />
                        </div>
                    )}
                </div>

                <div className="bg-white shadow-lg rounded-lg">
                    {productsToQuote.length ? (
                        <>
                            <div className="p-5 flex items-center justify-between">
                                <h2 className="font-bold text-xl">Productos:</h2>
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
                        </>
                    ) : (
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
