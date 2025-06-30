import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.png';

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/events', label: 'Events' },
    { to: '/contact', label: 'Contact Us' },
];

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <nav className="w-full bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            {/* Left side: Logo */}
            <div className="flex items-center space-x-2">
                <img
                    src={logo}
                    alt="InfraTrends logo icon"
                    className="w-12 h-12"
                />
                <span className="text-lg font-semibold text-gray-900">Indian Institute of Chemical Engineers</span>
            </div>

            {/* Center: Menu */}
            <ul className="hidden md:flex items-center space-x-6 text-sm text-gray-700 font-medium">
                {navLinks.map((link) => (
                    <li className="cursor-pointer hover:text-black" onClick={() => navigate(link.to)}>{link.label}</li>
                ))}

            </ul>

            {/* Right side: Subscribe Button */}
            <div>
                <button onClick={() => navigate('/subscribe')} className="bg-gray-900 text-white text-sm font-medium playfair-display px-4 py-2 rounded-full hover:bg-black flex items-center space-x-2">
                    <span>Subscribe</span>
                    <span className="text-sm">↗</span>
                </button>
            </div>
        </nav >
    );
};

export default Navbar;