import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";
import LenisScroll from "./components/LenisScroll";
import Generate from "./pages/Generate";
import MyGeneration from "./pages/MyGeneration";
import YtPreview from "./pages/YtPreview";
import Login from "./components/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PaymentSuccess from "./pages/PaymentSuccess";
import { useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

export default function App() {

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <>
                <Toaster />
                <ToastContainer theme="dark" position="bottom-right" />
                <LenisScroll />
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/generate" element={<Generate />} />
                    <Route path="/generate/:id" element={<Generate />} />
                    <Route path="/my-generation" element={<MyGeneration />} />
                    <Route path="/preview" element={<YtPreview />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/payment-success" element={<PaymentSuccess />} />
                </Routes>
                <Footer />
            </>
        </GoogleOAuthProvider>
    );
}