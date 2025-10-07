import DownloadQuotePdfModal from "../../components/admin/modals/DownloadQuotePdfModal";
import EditClientModal from "../../components/admin/modals/EditClientModal";
import EditProductModal from "../../components/admin/modals/EditProductModal";
import NewClientModal from "../../components/admin/modals/NewClientModal";
import NewProductModal from "../../components/admin/modals/NewProductModal";
import Sidebar from "../../components/shared/Sidebar";
import { Outlet, useLocation } from "react-router-dom";


export default function DashboardView() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const modals = {
    //client
    showModalNewClient: query.has("newClient"),
    showModalEditClient: query.has("editClient"),
    clientId: query.get("clientId"),
    //product
    showModalNewProduct:query.has("newProduct"),
    showModalEditProduct:query.has("editProduct"),
    productId: query.get("productId"),
    //quote
    showModalDownloadQuote:query.has("modalQuoteDownload"),
    quoteId: query.get("quoteId")
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 px-6 pb-6 lg:pb-12 relative overflow-y-scroll">
        <Outlet />
      </main>

      {/* Modal global */}
      {modals.showModalNewClient && (
        <NewClientModal />
      )}
      {modals.showModalEditClient && modals.clientId &&  (
        <EditClientModal/>
      )}
      {modals.showModalNewProduct && (
        <NewProductModal/>
      )}
      {modals.showModalEditProduct && modals.productId && (
        <EditProductModal/>
      )}
      {modals.showModalDownloadQuote && modals.quoteId && (
        <DownloadQuotePdfModal/>
      )}
    </div>
  );
}
