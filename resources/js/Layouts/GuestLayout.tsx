import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import { ScrollToTop } from '@/Components/ScrollToTop';
import { useTheme } from '@/Hooks/useTheme';
import { Sun, Moon } from 'lucide-react';

export default function Guest({ children }: PropsWithChildren) {
    const { isDark, toggleTheme } = useTheme();

    return (
        <div className={isDark ? 'dark' : ''}>
            <div className={`flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0
                ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}
            >
                <div>
                    <Link href="/">
                        <ApplicationLogo className={`h-20 w-20 fill-current ${
                            isDark ? 'text-gray-300' : 'text-gray-500'
                        }`} />
                    </Link>
                </div>

                <div className={`mt-6 w-full overflow-hidden px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg
                    ${isDark 
                        ? 'bg-gray-800 border border-gray-700'
                        : 'bg-white'
                    }`}
                >
                    {children}
                </div>

                {/* Theme Toggle Button */}
                <button
                    onClick={toggleTheme}
                    className={`fixed top-4 right-4 z-50 p-2 rounded-full shadow-lg 
                        transition-all duration-300 ease-in-out
                        ${isDark 
                            ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700 border border-gray-700'
                            : 'bg-white text-blue-600 hover:bg-gray-50'
                        }`}
                    aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                >
                    {isDark ? (
                        <Sun className="h-5 w-5" />
                    ) : (
                        <Moon className="h-5 w-5" />
                    )}
                </button>

                {/* Scroll To Top Button */}
                <ScrollToTop />
            </div>
        </div>
    );
}