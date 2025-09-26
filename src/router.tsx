import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/shared/ScrollToTop";
import NoFound from "./views/404/NoFound";
import LoginView from "./views/auth/LoginView";
import AdminLayout from "./views/layouts/AdminLayout";
import DashboardView from "./views/admin/DashboardView";
import AuthLayout from "./views/layouts/AuthLayout";
import QuotesView from "./views/admin/QuotesView";
import ClientsView from "./views/admin/ClientsView";
import ProductsView from "./views/admin/ProductsView";
import CreateQuoteView from "./views/admin/CreateQuoteView";
import CreateClientView from "./views/admin/CreateClientView";
import CreateProductView from "./views/admin/CreateProductView";

export default function Router() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>

                <Route element={<AdminLayout />}>
                    <Route path="/" element={<DashboardView />}>
                        <Route path="quotes" element={<QuotesView />} />
                        <Route path="clients" element={<ClientsView />} />
                        <Route path="products" element={<ProductsView />} />
                        <Route path="newQuote" element={<CreateQuoteView />} />
                        <Route path="newClient" element={<CreateClientView />} />
                        <Route path="newProduct" element={<CreateProductView />} />
                    </Route>
                </Route>


                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<LoginView />} index />
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path='*' element={<NoFound />} />
                </Route>

            </Routes>
        </BrowserRouter>
    )
}