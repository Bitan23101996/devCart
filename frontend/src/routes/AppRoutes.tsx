import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import MainLayout from '@/components/layout/MainLayout/MainLayout';
import ProtectedRoute from './ProtectedRoute';

//Login Page
const LoginPage = lazy(
    () => import('@/features/auth/pages/LoginPage')
);

//Registration Page
const RegistrationPage = lazy(
    () => import('@/features/auth/pages/RegistrationPage')
);

//Home Page
const HomePage = lazy(
    () => import('@/features/products/pages/HomePage')
);

//Cart Page
const CartPage = lazy(
    () => import('@/features/cart/pages/CartPage')
);

//ProductDetails Page
const ProductDetailsPage = lazy(
    () => import('@/features/products/pages/ProductDetailsPage')
);

//Payment Page
const PaymentPage = lazy(
    () => import('@/features/payment/pages/PaymentPage')
);

// OrderConfirmed Page
const OrderConfirmedPage = lazy(
    () => import('@/features/order/pages/OrderConfirmedPage')
);

//Not Found Page
const NotFoundPage = lazy(
    () => import('@/pages/NotFoundPage/NotFoundPage')
);

const AppRoutes = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>

                {/* Public Routes */}

                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />

                {/* Protected Routes */}
                <Route element={
                    <ProtectedRoute>
                        <MainLayout />
                    </ProtectedRoute>
                }
                >
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/home/:category" element={<HomePage />} />
                    <Route path="/product/:id" element={<ProductDetailsPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/payment" element={<PaymentPage />} />
                    <Route path="/order-confirmed" element={<OrderConfirmedPage />} />
                </Route>

                {/* 404 Route */}
                <Route path="*" element={<NotFoundPage />} />

            </Routes>
        </Suspense>
    )
}

export default AppRoutes;