import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { MenuIcon, XIcon } from 'lucide-react'

export default function Navbar() {
    const { isLoggedIn, user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const linkStyle: React.CSSProperties = { color: "#a1a1aa", fontSize: "14px", fontWeight: "500", transition: "color 0.2s" };

    return (
        <>
            <nav
                className="fixed top-0 z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32"
                style={{
                    backdropFilter: "blur(16px)",
                    background: "linear-gradient(180deg, rgba(6,5,13,0.88) 0%, rgba(6,5,13,0.6) 100%)",
                    borderBottom: "1px solid rgba(139,92,246,0.1)",
                }}
            >
                {/* Logo */}
                <Link to="/"><img src="/logo.svg" alt="logo" className="h-8 w-auto" /></Link>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-8">
                    {[
                        { to: "/", label: "Home" },
                        { to: "/generate", label: "Generate" },
                    ].map(({ to, label }) => (
                        <Link key={to} to={to} style={linkStyle}
                            onMouseEnter={e => (e.currentTarget.style.color = "#c4b5fd")}
                            onMouseLeave={e => (e.currentTarget.style.color = "#a1a1aa")}>
                            {label}
                        </Link>
                    ))}

                    {isLoggedIn ? (
                        <Link to="/my-generation" style={linkStyle}
                            onMouseEnter={e => (e.currentTarget.style.color = "#c4b5fd")}
                            onMouseLeave={e => (e.currentTarget.style.color = "#a1a1aa")}>
                            My Generations
                        </Link>
                    ) : (
                        <Link to="/about" style={linkStyle}
                            onMouseEnter={e => (e.currentTarget.style.color = "#c4b5fd")}
                            onMouseLeave={e => (e.currentTarget.style.color = "#a1a1aa")}>
                            About
                        </Link>
                    )}

                    <Link to="/contact" style={linkStyle}
                        onMouseEnter={e => (e.currentTarget.style.color = "#c4b5fd")}
                        onMouseLeave={e => (e.currentTarget.style.color = "#a1a1aa")}>
                        Contact Us
                    </Link>
                </div>

                {/* Auth */}
                <div className="flex items-center gap-3">
                    {isLoggedIn ? (
                        <div className="relative group">
                            {user?.avatar ? (
                                <img src={user.avatar} alt={user.name}
                                    className="rounded-full size-8 object-cover cursor-pointer"
                                    style={{ border: "1.5px solid rgba(139,92,246,0.5)" }} />
                            ) : (
                                <button
                                    className="rounded-full size-10 font-bold text-sm flex items-center justify-center text-white"
                                    style={{ background: "linear-gradient(135deg, #7c3aed, #5b21b6)" }}>
                                    {user?.name.charAt(0).toUpperCase()}
                                </button>
                            )}
                            {/* Dropdown */}
                            <div className="absolute hidden group-hover:flex flex-col top-8 right-0 pt-1 min-w-[150px] z-50">
                                <div className="rounded-xl overflow-hidden shadow-2xl"
                                    style={{ background: "#0f0c1f", border: "1px solid rgba(139,92,246,0.2)" }}>
                                    <p className="px-4 py-2 text-xs truncate" style={{ color: "#71717a", borderBottom: "1px solid rgba(139,92,246,0.1)" }}>
                                        {user?.name}
                                    </p>
                                    <button onClick={() => logout()} className="w-full text-left px-4 py-2.5 text-sm transition"
                                        style={{ color: "#d4d4d8" }}
                                        onMouseEnter={e => { e.currentTarget.style.color = "#c4b5fd"; e.currentTarget.style.background = "rgba(139,92,246,0.1)"; }}
                                        onMouseLeave={e => { e.currentTarget.style.color = "#d4d4d8"; e.currentTarget.style.background = "transparent"; }}>
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button onClick={() => navigate("/login")}
                            className="hidden md:flex items-center gap-1.5 px-6 py-2.5 rounded-full font-semibold text-sm transition-all active:scale-95 hover:brightness-110 text-white"
                            style={{
                                background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                                boxShadow: "0 2px 16px rgba(139,92,246,0.35)",
                            }}>
                            Get Started
                        </button>
                    )}

                    <button onClick={() => setIsOpen(true)} className="md:hidden" style={{ color: "#a1a1aa" }}>
                        <MenuIcon size={24} />
                    </button>
                </div>
            </nav>

            {/* Mobile menu */}
            <div
                className={`fixed inset-0 z-[100] flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-400 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
                style={{
                    background: "linear-gradient(160deg, #06050d 0%, #0f0c1f 100%)",
                    borderRight: "1px solid rgba(139,92,246,0.2)",
                }}
            >
                {[
                    { to: "/", label: "Home" },
                    { to: "/generate", label: "Generate" },
                    ...(isLoggedIn ? [{ to: "/my-generation", label: "My Generations" }] : [{ to: "/about", label: "About" }]),
                    { to: "/contact", label: "Contact Us" },
                ].map(({ to, label }) => (
                    <Link key={to} to={to} onClick={() => setIsOpen(false)} className="font-medium transition"
                        style={{ color: "#d4d4d8" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#c4b5fd")}
                        onMouseLeave={e => (e.currentTarget.style.color = "#d4d4d8")}>
                        {label}
                    </Link>
                ))}

                {isLoggedIn ? (
                    <button onClick={() => { setIsOpen(false); logout(); }}
                        className="text-sm px-8 py-2.5 rounded-full font-semibold text-white transition"
                        style={{ border: "1px solid rgba(139,92,246,0.4)", color: "#c4b5fd" }}>
                        Logout
                    </button>
                ) : (
                    <Link to="/login" onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 px-8 py-2.5 rounded-full font-semibold text-sm text-white"
                        style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}>
                        Get Started
                    </Link>
                )}

                <button onClick={() => setIsOpen(false)}
                    className="absolute top-5 right-5 size-9 rounded-xl flex items-center justify-center transition"
                    style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.25)", color: "#c4b5fd" }}>
                    <XIcon className="size-5" />
                </button>
            </div>
        </>
    );
}