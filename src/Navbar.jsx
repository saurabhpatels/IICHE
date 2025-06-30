import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.png';

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/events', label: 'Events' },
    { to: '/about', label: 'About Us' },
];

const Navbar = () => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleNavClick = (to) => {
        navigate(to);
        setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <nav className="w-full bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between relative z-50">
                {/* Left side: Logo */}
                <div className="flex items-center space-x-2">
                    <img
                        src={logo}
                        alt="InfraTrends logo icon"
                        className="w-12 h-12"
                    />
                    <span className="text-lg font-semibold text-gray-900 hidden sm:block">Indian Institute of Chemical Engineers</span>
                    <span className="text-sm font-semibold text-gray-900 sm:hidden">IICHE</span>
                </div>

                {/* Center: Desktop Menu */}
                <ul className="hidden md:flex items-center space-x-6">
                    {navLinks.map((link) => (
                        <li
                            key={link.to}
                            className={`cursor-pointer hover:text-black transition-colors ${window.location.pathname === link.to ? 'text-black font-bold' : 'text-gray-500'}`}
                            onClick={() => navigate(link.to)}
                        >
                            {link.label}
                        </li>
                    ))}
                </ul>

                {/* Right side: Subscribe Button & Mobile Menu Button */}
                <div className="flex items-center space-x-4">
                    {/* Desktop Subscribe Button */}
                    <button
                        onClick={() => navigate('/subscribe')}
                        className="hidden md:flex bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-black transition-colors items-center space-x-2"
                    >
                        <span className='playfair-display'>Subscribe</span>
                        <span className="text-sm">↗</span>
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden p-2 rounded-md text-gray-700 hover:text-black hover:bg-gray-100 transition-colors"
                        aria-label="Toggle mobile menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Menu Panel */}
            <div className={`
                fixed top-0 right-0 h-full w-full bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden
                ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
            `}>
                <div className="flex flex-col h-full">
                    {/* Mobile Menu Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <div className="flex items-center space-x-2">
                            <img
                                src={logo}
                                alt="InfraTrends logo icon"
                                className="w-10 h-10"
                            />
                            <span className="text-lg font-semibold text-gray-900">IICHE</span>
                        </div>
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="p-2 rounded-md text-gray-700 hover:text-black hover:bg-gray-100 transition-colors"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Mobile Menu Links */}
                    <div className="flex-1 p-6">
                        <ul className="space-y-4">
                            {navLinks.map((link) => (
                                <li key={link.to}>
                                    <button
                                        onClick={() => handleNavClick(link.to)}
                                        className="w-full text-left text-lg font-medium text-gray-700 hover:text-black hover:bg-gray-50 px-4 py-3 rounded-lg transition-colors"
                                    >
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Mobile Subscribe Button */}
                    <div className="p-6 border-t border-gray-200">
                        <button
                            onClick={() => handleNavClick('/subscribe')}
                            className="w-full bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-black transition-colors flex items-center justify-center space-x-2"
                        >
                            <span className='playfair-display text-lg'>Subscribe</span>
                            <span className="text-sm">↗</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;