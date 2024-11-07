import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
  FaHome, 
  FaInfoCircle, 
  FaBlog, 
  FaBuilding, 
  FaTimes, 
  FaBars, 
  FaUser, 
  FaEnvelope,
  FaUserCircle,
  FaSignOutAlt,
  FaTachometerAlt
} from 'react-icons/fa';
import { useAuth } from '@/Hooks/useAuth';

const Navbar = () => {
  const { url } = usePage();  // usePage hook to get the current URL
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Beranda', icon: FaHome },
    { path: '/tentang', label: 'Tentang', icon: FaInfoCircle },
    { path: '/organisasi', label: 'Organizations', icon: FaBuilding }, 
    { path: '/articles', label: 'Articles', icon: FaBlog },          
    { path: '/contact', label: 'Contact', icon: FaEnvelope },           
  ];

  const bottomNavItems = [
    { path: '/', icon: FaHome },
    { path: '/tentang', icon: FaInfoCircle },
    { path: '/organizations', icon: FaBuilding }, 
    { path: '/articles', icon: FaBlog },          
    { path: '/contact', icon: FaEnvelope },    
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <motion.nav
        className={`fixed w-full z-50 top-0 transition-all duration-300 ${
          isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-transparent'
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
              <div className="flex space-x-1 bg-white/80 backdrop-blur-md rounded-full p-1 shadow-lg">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center ${
                      url === item.path
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <item.icon className="mr-2" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right - Auth Section (Desktop) */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="relative">
                  <div className="flex items-center space-x-4">
                    <Link
                      href={route('home')}
                      className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 bg-white/80 backdrop-blur-md hover:bg-gray-100 transition-all duration-200 shadow-lg flex items-center"
                    >
                      <FaTachometerAlt className="mr-2" />
                      Dashboard
                    </Link>
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium text-blue-600 bg-white/80 backdrop-blur-md hover:bg-blue-50 transition-all duration-200 shadow-lg"
                    >
                      <FaUserCircle className="w-5 h-5" />
                      <span>{user.name}</span>
                    </button>
                  </div>

                  {/* Profile Dropdown */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg py-2 border border-gray-100">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                      >
                        <FaUser className="inline-block mr-2" />
                        Profile
                      </Link>
                      <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
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
                    className="px-4 py-2 rounded-full text-sm font-medium text-blue-600 bg-white/80 backdrop-blur-md hover:bg-blue-50 transition-all duration-200 shadow-lg"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 rounded-full text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-lg"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
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
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/80 backdrop-blur-md shadow-lg">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    url === item.path
                      ? 'text-blue-600 bg-blue-100'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </motion.nav>

      {/* Bottom Navigation (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden z-50">
        <div className="mx-4 mb-4">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-100">
            <div className="flex justify-between items-center px-4">
              {bottomNavItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="flex flex-col items-center py-3 px-2 transition-colors duration-200 relative"
                  onClick={() => setActiveItem(item.path)}
                >
                  {url === item.path && (
                    <div className="absolute -top-1 w-10 h-1 bg-blue-600 rounded-full" />
                  )}
                  <div 
                    className={`p-2 rounded-xl transition-all duration-200 ${
                      url === item.path
                        ? 'text-blue-600'
                        : 'text-gray-400 hover:text-blue-600'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span 
                    className={`text-[10px] mt-1 font-medium ${
                      url === item.path
                        ? 'text-blue-600'
                        : 'text-gray-500'
                    }`}
                  >
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
