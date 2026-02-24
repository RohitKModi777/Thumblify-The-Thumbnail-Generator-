import React, { useEffect, useState } from 'react'
import SoftBackdrop from './SoftBackdrop'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google'
import { SparklesIcon } from 'lucide-react'

const Login = () => {
    const navigate = useNavigate();
    const [state, setState] = useState("login")
    const { user, login, signUp, googleLogin } = useAuth();

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (state === 'login') {
            await login(formData)
        } else {
            await signUp(formData)
        }
    }

    const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
        if (credentialResponse.credential) {
            await googleLogin(credentialResponse.credential)
        }
    }

    useEffect(() => {
        if (user) navigate('/')
    }, [user])

    /* ── Purple accent ── */
    const inputBase: React.CSSProperties = {
        background: "rgba(15,12,31,0.85)",
        border: "1px solid rgba(168,85,247,0.22)",
        borderRadius: "12px",
        color: "#f4f4f5",
    };
    const focus = (e: React.FocusEvent<HTMLDivElement>) =>
        (e.currentTarget.style.border = "1px solid rgba(168,85,247,0.55)");
    const blur = (e: React.FocusEvent<HTMLDivElement>) =>
        (e.currentTarget.style.border = "1px solid rgba(168,85,247,0.22)");

    return (
        <>
            <SoftBackdrop />
            <div className="min-h-screen flex items-center justify-center px-4 pt-20">
                {/* Purple gradient border card */}
                <div
                    className="w-full sm:w-[400px]"
                    style={{
                        padding: "1px",
                        borderRadius: "24px",
                        background: "linear-gradient(135deg, #a855f7, #7e22ce, #a855f7)",
                    }}
                >
                    <div
                        className="rounded-[23px] px-8 py-10"
                        style={{ background: "linear-gradient(160deg, #0b0917 0%, #130c21 100%)" }}
                    >
                        {/* Header */}
                        <div className="text-center mb-7">
                            <div className="flex justify-center mb-4">
                                <div
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                                    style={{ background: "linear-gradient(135deg, #9333ea, #6d28d9)" }}
                                >
                                    <SparklesIcon className="size-6 text-white" />
                                </div>
                            </div>
                            <h1
                                className="text-2xl font-extrabold"
                                style={{
                                    background: "linear-gradient(135deg, #ffffff, #c4b5fd, #d4d4d8)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                {state === "login" ? "Welcome Back" : "Create Account"}
                            </h1>
                            <p className="text-xs mt-1" style={{ color: "#71717a" }}>
                                {state === "login" ? "Sign in to continue to Thumblify" : "Join thousands of creators today"}
                            </p>
                        </div>

                        {/* Google */}
                        <div className="flex justify-center mb-5">
                            <GoogleLogin
                                onSuccess={handleGoogleSuccess}
                                onError={() => console.error('Google login failed')}
                                theme="filled_black"
                                shape="pill"
                                size="large"
                                width="310"
                                text={state === "login" ? "signin_with" : "signup_with"}
                            />
                        </div>

                        {/* Divider */}
                        <div className="flex items-center gap-3 mb-5">
                            <div className="flex-1 h-px" style={{ background: "rgba(168,85,247,0.15)" }} />
                            <span className="text-xs shrink-0" style={{ color: "#52525b" }}>or continue with email</span>
                            <div className="flex-1 h-px" style={{ background: "rgba(168,85,247,0.15)" }} />
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-3">
                            {state !== "login" && (
                                <div className="flex items-center pl-3 rounded-xl transition-all" style={inputBase}
                                    onFocus={focus} onBlur={blur}>
                                    <svg className="size-4 shrink-0" style={{ color: "#a855f7" }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" />
                                    </svg>
                                    <input type="text" name="name" placeholder="Full Name"
                                        className="w-full p-3 outline-none bg-transparent text-sm" style={{ color: "#f4f4f5" }}
                                        value={formData.name} onChange={handleChange} required />
                                </div>
                            )}

                            <div className="flex items-center pl-3 rounded-xl transition-all" style={inputBase}
                                onFocus={focus} onBlur={blur}>
                                <svg className="size-4 shrink-0" style={{ color: "#a855f7" }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" />
                                </svg>
                                <input type="email" name="email" placeholder="Email address"
                                    className="w-full p-3 outline-none bg-transparent text-sm" style={{ color: "#f4f4f5" }}
                                    value={formData.email} onChange={handleChange} required />
                            </div>

                            <div className="flex items-center pl-3 rounded-xl transition-all" style={inputBase}
                                onFocus={focus} onBlur={blur}>
                                <svg className="size-4 shrink-0" style={{ color: "#a855f7" }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <rect width="18" height="11" x="3" y="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                                <input type="password" name="password" placeholder="Password"
                                    className="w-full p-3 outline-none bg-transparent text-sm" style={{ color: "#f4f4f5" }}
                                    value={formData.password} onChange={handleChange} required />
                            </div>

                            {state === "login" && (
                                <div className="text-right">
                                    <button type="button" className="text-xs transition" style={{ color: "#a855f7" }}
                                        onMouseEnter={e => (e.currentTarget.style.color = "#c084fc")}
                                        onMouseLeave={e => (e.currentTarget.style.color = "#a855f7")}>
                                        Forgot password?
                                    </button>
                                </div>
                            )}

                            {/* PURPLE button */}
                            <button
                                type="submit"
                                className="w-full h-11 rounded-xl font-bold text-sm transition-all active:scale-95 hover:brightness-110 mt-1"
                                style={{
                                    background: "linear-gradient(135deg, #9333ea, #7c3aed, #6d28d9)",
                                    color: "#fff",
                                    boxShadow: "0 4px 20px rgba(147,51,234,0.4)",
                                }}
                            >
                                {state === "login" ? "Sign In" : "Create Account"}
                            </button>
                        </form>

                        <p
                            onClick={() => setState(prev => prev === "login" ? "register" : "login")}
                            className="text-sm mt-5 text-center cursor-pointer"
                            style={{ color: "#71717a" }}
                        >
                            {state === "login" ? "Don't have an account? " : "Already have an account? "}
                            <span className="font-semibold transition" style={{ color: "#a855f7" }}>
                                {state === "login" ? "Sign up" : "Sign in"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login