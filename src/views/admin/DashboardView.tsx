import { FiMenu } from "react-icons/fi";
import DownloadQuotePdfModal from "../../components/admin/modals/DownloadQuotePdfModal";
import EditClientModal from "../../components/admin/modals/EditClientModal";
import EditProductModal from "../../components/admin/modals/EditProductModal";
import EditUserModal from "../../components/admin/modals/EditUserModal";
import NewClientModal from "../../components/admin/modals/NewClientModal";
import NewProductModal from "../../components/admin/modals/NewProductModal";
import NewUserModal from "../../components/admin/modals/NewUserModal";
import Sidebar from "../../components/shared/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";


export default function DashboardView() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const [open, setOpen] = useState(false);

  const modals = {
    //client
    showModalNewClient: query.has("newClient"),
    showModalEditClient: query.has("editClient"),
    clientId: query.get("clientId"),
    //product
    showModalNewProduct: query.has("newProduct"),
    showModalEditProduct: query.has("editProduct"),
    productId: query.get("productId"),
    //quote
    showModalDownloadQuote: query.has("modalQuoteDownload"),
    //user
    showModalNewUser: query.has("modalNewUser"),
    showModalUpdateUser: query.has("updateUserModal"),
    userId: query.get("userId"),
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar 
        setOpen={setOpen}
        open={open}
      />

      <main className="flex-1 px-6 pb-6 lg:pb-12 relative overflow-y-scroll">
        <Outlet />
        <button 
          onClick={()=>setOpen(!open)}
          className="md:hidden cursor-pointer">
          <FiMenu size={22} className="fixed top-7 right-10" />
        </button>
      </main>

      {/* Modal global */}
      {modals.showModalNewClient && (
        <NewClientModal />
      )}
      {modals.showModalEditClient && modals.clientId && (
        <EditClientModal />
      )}
      {modals.showModalNewProduct && (
        <NewProductModal />
      )}
      {modals.showModalEditProduct && modals.productId && (
        <EditProductModal />
      )}
      {modals.showModalDownloadQuote && (
        <DownloadQuotePdfModal />
      )}
      {modals.showModalNewUser && (
        <NewUserModal />
      )}
      {modals.showModalUpdateUser && modals.userId && <EditUserModal />}
    </div>
  );
}
