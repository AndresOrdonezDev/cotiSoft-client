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
import EditQuoteView from "./views/admin/EditQuoteView";
import AuthView from "./views/admin/AuthView";
import ForgotPasswordView from "./views/auth/ForgotPasswordView";
import AttachmentsView from "./views/admin/AttachmentsView";


export default function Router() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>

                <Route element={<AdminLayout />}>
                    <Route path="/" element={<DashboardView />}>
                        <Route index element={<QuotesView />} />
                        <Route path="clients" element={<ClientsView />} />
                        <Route path="products" element={<ProductsView />} />
                        <Route path="attachments" element={<AttachmentsView />} />
                        <Route path="newQuote" element={<CreateQuoteView />} />
                        <Route path="editQuote/:id" element={<EditQuoteView/>} />
                        <Route path="auth" element={<AuthView/>} />

                    </Route>
                </Route>


                <Route  element={<AuthLayout />}>
                    <Route path="/login" element={<LoginView />} index />
                    <Route path="/forgot-password/:email/:token" element={<ForgotPasswordView />} index />
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path='*' element={<NoFound />} />
                </Route>

            </Routes>
        </BrowserRouter>
    )
}