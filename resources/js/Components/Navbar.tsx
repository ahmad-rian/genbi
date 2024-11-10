import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    FaHome,
    FaInfoCircle,
    FaBuilding,
    FaTimes,
    FaBars,
    FaUser,
    FaEnvelope,
    FaUserCircle,
    FaSignOutAlt,
    FaTachometerAlt,
    FaSun,
    FaMoon,
    FaFolder,
    FaStar,
    FaPodcast
} from 'react-icons/fa';
import { useAuth } from '@/Hooks/useAuth';
import { useTheme } from '@/Hooks/useTheme';
import { BookOpen } from 'lucide-react';

const Navbar = () => {
    const { url } = usePage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null); // Track the active dropdown
    const { user } = useAuth();
    const { isDark, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { path: '/', label: 'Beranda', icon: FaHome },
        { path: '/', label: 'Tentang Kami', icon: FaInfoCircle },
        { path: '/', label: 'Media', icon: FaFolder },
        { path: '/contact', label: 'Kontak', icon: FaEnvelope },
    ];

    const bottomNavItems = [
        // { path: '/', icon: FaHome },
        // { path: '/tentang',  icon: FaInfoCircle },
        // { path: '/organizations', icon: FaBuilding },
        // { path: '/articles', icon: FaBlog },
        // { path: '/media', icon: FaFolder },
        // { path: '/contact', icon: FaEnvelope },
    ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleDropdown = (dropdown: string) => {
        setActiveDropdown(activeDropdown === dropdown ? null : dropdown); // Toggle the dropdown, close others
    };

    return (
        <>
            <motion.nav
                className={`fixed w-full z-50 top-0 transition-all duration-300 ${
                    isScrolled
                        ? isDark
                            ? 'bg-gray-900/80 backdrop-blur-md shadow-md border-b border-gray-800'
                            : 'bg-white/80 backdrop-blur-md shadow-md'
                        : 'bg-transparent'
                }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 md:h-20">
                        {/* Left - Logo */}
                        <div className="flex-shrink-0">
                            <Link href={route('home')} className="flex items-center">
                                <img
                                    src="/images/genbi-logo.png"
                                    alt="GenBI Logo"
                                    className="h-8 md:h-10 w-auto"
                                />
                            </Link>
                        </div>

                        {/* Center - Navigation (Desktop) */}
                        <div className="hidden md:flex">
                            <div className={`flex space-x-1 ${
                                isDark
                                    ? 'bg-gray-800/80'
                                    : 'bg-white/80'
                                } backdrop-blur-md rounded-full p-1 shadow-lg`}>
                                {navItems.map((item) => (
                                    <div key={item.path} className="relative">
                                        {item.label === 'Media' && (
                                            <div>
                                                <button
                                                    onClick={() => toggleDropdown('media')}
                                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center ${
                                                        url === "/artikel" || url === "/podcast"
                                                            ? 'bg-blue-600 text-white'
                                                            : isDark
                                                                ? 'text-gray-300 hover:bg-gray-700'
                                                                : 'text-gray-700 hover:bg-gray-200'
                                                    }`}
                                                >
                                                    <item.icon className="mr-2" />
                                                    {item.label}
                                                </button>

                                                {activeDropdown === 'media' && (
                                                    <div className="absolute left-0 mt-2 bg-white shadow-md rounded-md w-48">
                                                        <Link
                                                            href="/artikel"
                                                            className="px-4 py-2 text-sm flex items-center"
                                                        >
                                                            <div className="mr-3 size-8 bg-slate-300 rounded-lg flex justify-center p-[7px] items-center">
                                                                <BookOpen className="text-gray-700"/>
                                                            </div>
                                                            <p className="block text-gray-700 font-semibold">Artikel</p>
                                                        </Link>
                                                        <Link
                                                            href="/podcast"
                                                            className="px-4 py-2 text-sm flex items-center"
                                                        >
                                                            <div className="mr-3 size-8 bg-slate-300 rounded-lg flex justify-center p-[7px] items-center">
                                                                <FaPodcast className="text-gray-700"/>
                                                            </div>
                                                            <p className="block text-gray-700 font-semibold">Podcast</p>
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {item.label === 'Tentang Kami' && (
                                            <div>
                                                <button
                                                    onClick={() => toggleDropdown('tentang kami')}
                                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center ${
                                                        url === "/tentang" || url === "/organisasi"
                                                            ? 'bg-blue-600 text-white'
                                                            : isDark
                                                                ? 'text-gray-300 hover:bg-gray-700'
                                                                : 'text-gray-700 hover:bg-gray-200'
                                                    }`}
                                                >
                                                    <item.icon className="mr-2" />
                                                    {item.label}
                                                </button>

                                                {activeDropdown === 'tentang kami' && (
                                                    <div className="absolute left-0 mt-2 bg-white shadow-md w-[300px] px-4 hover:bg-primary-50 group cursor-pointer gap-1 rounded-lg p-3 text-left font-medium">
                                                        <Link
                                                            href="/genbi-point"
                                                            className="px-4 py-2 text-sm flex items-center"
                                                        >
                                                            <div className="mr-3 size-8 bg-slate-300 rounded-lg flex justify-center p-[7px] items-center">
                                                                <FaStar className="text-gray-700"/>
                                                            </div>
                                                            <p className="block text-gray-700 font-semibold">GenBI Point</p>
                                                        </Link>
                                                        <Link
                                                            href="/tentang"
                                                            className="px-4 py-2 text-sm flex items-center"
                                                        >
                                                            <div className="mr-3 size-8 bg-slate-300 rounded-lg flex justify-center p-[7px] items-center">
                                                                <FaInfoCircle className="text-gray-700"/>
                                                            </div>
                                                            <p className="block text-gray-700 font-semibold">Tentang GenBI Purwokerto</p>
                                                        </Link>
                                                        <Link
                                                            href="/organisasi"
                                                            className="px-4 py-2 text-sm flex items-center"
                                                        >
                                                            <div className="mr-3 size-8 bg-slate-300 rounded-lg flex justify-center p-[7px] items-center">
                                                                <FaBuilding className="text-gray-700"/>
                                                            </div>
                                                            <p className="block text-gray-700 font-semibold">Profile Organisasi</p>
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Dropdown for other items (Tentang, Organisasi, etc.) */}
                                        {item.label !== 'Media' && item.label !== 'Tentang Kami' && (
                                            <Link
                                                href={item.path}
                                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center ${
                                                    url === item.path
                                                        ? 'bg-blue-600 text-white'
                                                        : isDark
                                                            ? 'text-gray-300 hover:bg-gray-700'
                                                            : 'text-gray-700 hover:bg-gray-200'
                                                }`}
                                            >
                                                <item.icon className="mr-2" />
                                                {item.label}
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right - Auth Section (Desktop) */}
                        <div className="hidden md:flex items-center space-x-4">
                            {/* Theme Toggle Button */}
                            <button
                                onClick={toggleTheme}
                                className={`p-2 rounded-full transition-all duration-200 flex items-center justify-center ${
                                    isDark
                                        ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700 border border-gray-700'
                                        : 'bg-white/80 text-blue-600 hover:bg-gray-100'
                                } shadow-lg`}
                                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                            >
                                {isDark ? (
                                    <FaSun className="w-5 h-5" />
                                ) : (
                                    <FaMoon className="w-5 h-5" />
                                )}
                            </button>

                            {user ? (

                                <div className="relative">
                                    <div className="flex items-center space-x-4">
                                        <Link
                                            href={route('dashboard')}
                                            className={`px-4 py-2 rounded-full text-sm font-medium ${
                                                isDark
                                                    ? 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                                                    : 'bg-white/80 text-gray-700 hover:bg-gray-100'
                                            } backdrop-blur-md transition-all duration-200 shadow-lg flex items-center`}
                                        >
                                            <FaTachometerAlt className="mr-2" />
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                                            className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium ${
                                                isDark
                                                    ? 'text-blue-400 bg-gray-800 hover:bg-gray-700'
                                                    : 'text-blue-600 bg-white/80 hover:bg-blue-50'
                                            } backdrop-blur-md transition-all duration-200 shadow-lg`}
                                        >
                                            <FaUserCircle className="w-5 h-5" />
                                            <span>{user.name}</span>
                                        </button>
                                    </div>

                                    {/* Profile Dropdown */}
                                    {isProfileOpen && (
                                        <div className={`absolute right-0 mt-2 w-48 rounded-xl ${
                                            isDark
                                                ? 'bg-gray-800 border-gray-700'
                                                : 'bg-white border-gray-100'
                                            } shadow-lg py-2 border`}>
                                            <Link
                                                href="/profile"
                                                className={`block px-4 py-2 text-sm ${
                                                    isDark
                                                        ? 'text-gray-300 hover:bg-gray-700'
                                                        : 'text-gray-700 hover:bg-blue-50'
                                                }`}
                                            >
                                                <FaUser className="inline-block mr-2" />
                                                Profile
                                            </Link>
                                            <Link
                                                href="/logout"
                                                method="post"
                                                as="button"
                                                className={`block w-full text-left px-4 py-2 text-sm ${
                                                    isDark
                                                        ? 'text-red-400 hover:bg-red-900/30'
                                                        : 'text-red-600 hover:bg-red-50'
                                                }`}
                                            >
                                                <FaSignOutAlt className="inline-block mr-2" />
                                                Logout
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                                            isDark
                                                ? 'bg-gray-800 text-blue-400 hover:bg-gray-700'
                                                : 'bg-white/80 text-blue-600 hover:bg-blue-50'
                                            } transition-all duration-200 shadow-lg`}
                                    >
                                        Login
                                    </Link>
                                    {/* <Link
                                        href="/register"
                                        className="px-4 py-2 rounded-full text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-lg"
                                    >
                                        Register
                                    </Link> */}
                                </>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center space-x-2">
                            {/* Mobile Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className={`p-2 rounded-full transition-all duration-200 ${
                                    isDark
                                        ? 'bg-gray-800 text-yellow-400 border border-gray-700'
                                        : 'bg-white/80 text-blue-600'
                                } shadow-lg`}
                            >
                                {isDark ? (
                                    <FaSun className="w-5 h-5" />
                                ) : (
                                    <FaMoon className="w-5 h-5" />
                                )}
                            </button>

                            <button
                                onClick={toggleMenu}
                                className={isDark ? 'text-gray-300' : 'text-gray-700'}
                            >
                                {isMenuOpen ? (
                                    <FaTimes className="h-6 w-6" />
                                ) : (
                                    <FaBars className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile dropdown menu */}
                {/* Mobile dropdown menu */}
<AnimatePresence>
    {isMenuOpen && (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
        >
            <div className={`px-4 py-6 ${
                isDark
                    ? 'bg-gray-900/95 border-t border-gray-800'
                    : 'bg-white/95'
                } backdrop-blur-lg`}
            >
                <div className="space-y-6">
                    {/* Menu Items */}
                    <div className="space-y-2">
                        {navItems.map((item) => (
                            <div key={item.path}>
                                {item.label === 'Media' || item.label === 'Tentang Kami' ? (
                                    <div className="space-y-2">
                                        <motion.button
                                            onClick={() => toggleDropdown(item.label.toLowerCase())}
                                            className={`w-full flex items-center justify-between p-3 rounded-xl ${
                                                isDark
                                                    ? 'text-gray-300 hover:bg-gray-800/60'
                                                    : 'text-gray-700 hover:bg-gray-100'
                                            } transition-all duration-200`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className={`size-9 rounded-xl flex items-center justify-center ${
                                                    isDark ? 'bg-gray-800/80' : 'bg-gray-100'
                                                }`}>
                                                    <item.icon className="w-5 h-5" />
                                                </div>
                                                <span className="font-medium">{item.label}</span>
                                            </div>
                                            <motion.div
                                                animate={{ rotate: activeDropdown === item.label.toLowerCase() ? 180 : 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <ChevronDown className="w-5 h-5" />
                                            </motion.div>
                                        </motion.button>

                                        <AnimatePresence>
                                            {activeDropdown === item.label.toLowerCase() && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="pl-12 space-y-2"
                                                >
                                                    {item.label === 'Media' ? (
                                                        <>
                                                            <MobileMenuItem
                                                                href="/artikel"
                                                                icon={BookOpen}
                                                                label="Artikel"
                                                                isDark={isDark}
                                                                onClick={() => {
                                                                    setActiveDropdown(null);
                                                                    setIsMenuOpen(false);
                                                                }}
                                                            />
                                                            <MobileMenuItem
                                                                href="/podcast"
                                                                icon={FaPodcast}
                                                                label="Podcast"
                                                                isDark={isDark}
                                                                onClick={() => {
                                                                    setActiveDropdown(null);
                                                                    setIsMenuOpen(false);
                                                                }}
                                                            />
                                                        </>
                                                    ) : (
                                                        <>
                                                            <MobileMenuItem
                                                                href="/genbi-point"
                                                                icon={FaStar}
                                                                label="GenBI Point"
                                                                isDark={isDark}
                                                                onClick={() => {
                                                                    setActiveDropdown(null);
                                                                    setIsMenuOpen(false);
                                                                }}
                                                            />
                                                            <MobileMenuItem
                                                                href="/tentang"
                                                                icon={FaInfoCircle}
                                                                label="Tentang GenBI Purwokerto"
                                                                isDark={isDark}
                                                                onClick={() => {
                                                                    setActiveDropdown(null);
                                                                    setIsMenuOpen(false);
                                                                }}
                                                            />
                                                            <MobileMenuItem
                                                                href="/organisasi"
                                                                icon={FaBuilding}
                                                                label="Profile Organisasi"
                                                                isDark={isDark}
                                                                onClick={() => {
                                                                    setActiveDropdown(null);
                                                                    setIsMenuOpen(false);
                                                                }}
                                                            />
                                                        </>
                                                    )}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    <Link
                                        href={item.path}
                                        className={`flex items-center space-x-3 p-3 rounded-xl ${
                                            url === item.path
                                                ? 'bg-blue-600 text-white'
                                                : isDark
                                                    ? 'text-gray-300 hover:bg-gray-800/60'
                                                    : 'text-gray-700 hover:bg-gray-100'
                                        } transition-all duration-200`}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <div className={`size-9 rounded-xl flex items-center justify-center ${
                                            url === item.path
                                                ? 'bg-blue-500'
                                                : isDark ? 'bg-gray-800/80' : 'bg-gray-100'
                                        }`}>
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <span className="font-medium">{item.label}</span>
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Auth Section */}
                    <div className={`pt-4 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                        {user ? (
                            <div className="space-y-2">
                                <MobileMenuItem
                                    href="/dashboard"
                                    icon={FaTachometerAlt}
                                    label="Dashboard"
                                    isDark={isDark}
                                    onClick={() => setIsMenuOpen(false)}
                                />
                                <MobileMenuItem
                                    href="/profile"
                                    icon={FaUser}
                                    label="Profile"
                                    isDark={isDark}
                                    onClick={() => setIsMenuOpen(false)}
                                />
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`w-full flex items-center space-x-3 p-3 rounded-xl ${
                                        isDark
                                            ? 'text-red-400 hover:bg-red-900/20'
                                            : 'text-red-600 hover:bg-red-50'
                                    } transition-all duration-200`}
                                >
                                    <div className={`size-9 rounded-xl flex items-center justify-center ${
                                        isDark ? 'bg-red-900/30' : 'bg-red-50'
                                    }`}>
                                        <FaSignOutAlt className="w-5 h-5" />
                                    </div>
                                    <span className="font-medium">Logout</span>
                                </Link>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className={`flex items-center space-x-3 p-3 rounded-xl ${
                                    isDark
                                        ? 'text-blue-400 hover:bg-blue-900/20'
                                        : 'text-blue-600 hover:bg-blue-50'
                                } transition-all duration-200`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <div className={`size-9 rounded-xl flex items-center justify-center ${
                                    isDark ? 'bg-blue-900/30' : 'bg-blue-50'
                                }`}>
                                    <FaUser className="w-5 h-5" />
                                </div>
                                <span className="font-medium">Login</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    )}
</AnimatePresence>
            </motion.nav>

            {/* Bottom Navigation (Mobile) */}
<div className="fixed bottom-0 left-0 right-0 md:hidden z-50">
    <div className="mx-4 mb-4">
        <div className={`
            backdrop-blur-md rounded-2xl shadow-lg border
            ${isDark
                ? 'bg-gradient-to-r from-gray-900/90 to-gray-800/90 border-gray-700'
                : 'bg-gradient-to-r from-white/90 to-gray-50/90 border-gray-200'
            }
        `}>
            {/* Glass Morphism Effect */}
            <div className="absolute inset-0 rounded-2xl bg-white/5 backdrop-blur-sm" />

            {/* Navigation Items */}
            <div className="relative grid grid-cols-6 items-center px-2">
                {bottomNavItems.map((item) => (
                    <Link
                        key={item.path}
                        href={item.path}
                        className="flex flex-col items-center py-3 transition-all duration-300 relative group"
                    >
                        {url === item.path && (
                            <motion.div
                                layoutId="bottomNav"
                                className={`
                                    absolute -top-1 w-8 h-1 rounded-full
                                    bg-gradient-to-r from-blue-600 to-blue-400
                                    shadow-lg shadow-blue-500/30
                                `}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30
                                }}
                            />
                        )}

                        <div className={`
                            p-1.5 rounded-xl transition-all duration-300
                            ${url === item.path
                                ? isDark
                                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/20'
                                    : 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/20'
                                : isDark
                                    ? 'text-gray-400 hover:text-blue-400 group-hover:bg-gray-800/50'
                                    : 'text-gray-500 hover:text-blue-600 group-hover:bg-gray-100/50'
                            }
                        `}>
                            <item.icon className={`
                                h-4 w-4 transition-transform duration-300
                                ${url === item.path ? 'scale-110' : 'group-hover:scale-110'}
                            `} />
                        </div>

                        <span className={`
                            text-[9px] mt-0.5 font-medium transition-all duration-300
                            ${url === item.path
                                ? isDark
                                    ? 'text-blue-400'
                                    : 'text-blue-600'
                                : isDark
                                    ? 'text-gray-400 group-hover:text-blue-400'
                                    : 'text-gray-500 group-hover:text-blue-600'
                            }
                        `}>
                        </span>

                        {/* Active/Hover Effect */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: url === item.path ? 1 : 0,
                                opacity: url === item.path ? 1 : 0
                            }}
                            className="absolute inset-0 bg-blue-400/10 rounded-xl -z-10"
                        />
                    </Link>
                ))}
            </div>
        </div>
    </div>
</div>

        {/* Click Away Listener for Profile Dropdown */}
        {isProfileOpen && (
            <div
                className="fixed inset-0 z-40"
                onClick={() => setIsProfileOpen(false)}
            />
        )}
    </>
);
};

export default Navbar;