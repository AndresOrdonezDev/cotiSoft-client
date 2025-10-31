import { FiFileText, FiPackage, FiUsers, FiLogOut, FiMenu, FiX, FiLock } from "react-icons/fi";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../api/AuthAPI";
import { toast } from "react-toastify";
type SidebarProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    open: boolean
}
export default function Sidebar({ setOpen, open }: SidebarProps) {

    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const menuItems = [
        { name: "Cotizaciones", path: "quotes", icon: <FiFileText size={20} /> },
        { name: "Productos", path: "products", icon: <FiPackage size={20} /> },
        { name: "Clientes", path: "clients", icon: <FiUsers size={20} /> },
        { name: "Ingreso", path: "auth", icon: <FiLock size={20} /> },
    ];
    const { mutate } = useMutation({
        mutationFn: logout,
        onError: (data) => toast.error(data.message),
        onSuccess: () => {
            localStorage.removeItem('token-cotisoft')
            queryClient.removeQueries({ queryKey: ['user'] })
            navigate('login')
        }
    })
    const handleLogout = () => {
        mutate()
    }
    return (
        <aside
            className={`bg-gray-900 text-gray-200 font-bold transition-all duration-300 flex flex-col ${open ? "w-full absolute h-full z-50 lg:w-64 lg:relative lg:h-auto lg:z-auto" : "w-20 -ml-20 lg:ml-0"
                }`}
        >
            <button className={`cursor-pointer hover:text-teal-300 absolute ${open ? 'right-5 top-5 z-0':'left-4 top-2'}`} onClick={() => setOpen(!open)}>
                {open ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
            {/* Header */}
            <div className="flex items-center justify-between p-4 w-full">
                <div className="mx-auto">
                    {open && <Logo />}
                </div>
            </div>

            {/* Menu */}
            <nav className="flex-1">
                {menuItems.map(({ name, icon, path }) => (
                    <Link
                        onClick={()=>setOpen(false)}
                        key={name}
                        to={path}
                        className=" flex items-center gap-3 px-4 py-3 hover:bg-gray-800 transition hover:text-teal-300"
                    >
                        {icon}
                        {open && <span className="text-white">{name}</span>}
                    </Link>
                ))}
            </nav>

            {/* Logout */}
            <div className="p-4">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full hover:bg-slate-700 px-4 py-3 rounded transition hover:text-red-400">
                    <FiLogOut size={20} />
                    {open && <span>Cerrar sesión</span>}
                </button>
            </div>
        </aside>
    )
}