import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/shared/ScrollToTop";
import NoFound from "./views/404/NoFound";
import LoginView from "./views/auth/LoginView";
import AdminLayout from "./layouts/AdminLayout";
import DashboardView from "./views/admin/DashboardView";
import AuthLayout from "./layouts/AuthLayout";
import QuotesView from "./views/admin/QuotesView";
import ClientsView from "./views/admin/ClientsView";
import ProductsView from "./views/admin/ProductsView";
import CreateQuoteView from "./views/admin/CreateQuoteView";


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