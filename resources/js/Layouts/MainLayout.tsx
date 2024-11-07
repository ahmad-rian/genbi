// resources/js/Layouts/MainLayout.tsx
import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import { ScrollToTop } from '@/Components/ScrollToTop';
import { useTheme } from '@/Hooks/useTheme';
import Footer from '@/Components/Footer';

interface MainLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function MainLayout({ children, title = 'Home' }: MainLayoutProps) {
    const { isDark } = useTheme();

    return (
        <div className={isDark ? 'dark' : ''}>
            <Head title={title} />
            
            <div className="min-h-screen relative">
                {/* Main background with theme-aware gradient */}
                <div className={`fixed inset-0 transition-colors duration-300 ${
                    isDark 
                        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
                        : 'bg-gradient-to-br from-blue-50 via-white to-blue-100'
                }`} />
                
                {/* Content container with relative positioning */}
                <div className="relative">
                    <Navbar />
                    <main>
                        {children}
                    </main>
                    <Footer />
                    <ScrollToTop />
                </div>
            </div>
        </div>
    );
}