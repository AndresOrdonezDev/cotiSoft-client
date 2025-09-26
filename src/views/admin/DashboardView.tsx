import NewClientModal from "../../components/admin/modals/NewClientModal";
import Sidebar from "../../components/shared/Sidebar";
import { Outlet, useSearchParams} from "react-router-dom";


export default function DashboardView() {
  const [searchParams] = useSearchParams();


  const isNewClientOpen = searchParams.get("newClient") === "true";

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 px-6 pb-6 lg:pb-12 relative overflow-y-scroll">
        <Outlet />
      </main>

      {/* Modal global */}
      {isNewClientOpen && (
        <NewClientModal/>
      )}
    </div>
  );
}
