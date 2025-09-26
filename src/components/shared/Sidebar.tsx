import { useState } from "react";
import { FiFileText, FiPackage, FiUsers, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import Logo from "./Logo";
import { Link } from "react-router-dom";
export default function Sidebar() {
    const [open, setOpen] = useState(true);
    const menuItems = [
        { name: "Cotizaciones",path:"quotes", icon: <FiFileText size={20} /> },
        { name: "Productos", path:"products", icon: <FiPackage size={20} /> },
        { name: "Clientes", path:"clients", icon: <FiUsers size={20} /> },
    ];
    return (
        <aside
            className={`bg-gray-900 text-gray-200 font-bold transition-all duration-300 flex flex-col ${open ? "w-64" : "w-20"
                }`}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 ">
                {open && <span></span>}
                {open && <Logo/>}
                <button className="cursor-pointer hover:text-teal-300" onClick={() => setOpen(!open)}>
                    {open ? <FiX size={22} /> : <FiMenu size={22} />}
                </button>
            </div>

            {/* Menu */}
            <nav className="flex-1">
                {menuItems.map(({ name, icon,path }) => (
                    <Link
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
                <button className="flex items-center gap-3 w-full hover:bg-slate-700 px-4 py-3 rounded transition hover:text-red-400">
                    <FiLogOut size={20} />
                    {open && <span>Cerrar sesión</span>}
                </button>
            </div>
        </aside>
    )
}