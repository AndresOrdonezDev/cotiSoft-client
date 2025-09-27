import EditClientModal from "../../components/admin/modals/EditClientModal";
import NewClientModal from "../../components/admin/modals/NewClientModal";
import Sidebar from "../../components/shared/Sidebar";
import { Outlet, useLocation } from "react-router-dom";


export default function DashboardView() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const modals = {
    showModalNewClient: query.has("newClient"),
    showModalEditClient: query.has("editClient"),
    clientId: query.get("clientId"),
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
      {modals.showModalEditClient && (
        <EditClientModal/>
      )}
    </div>
  );
}
