import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/Contexts/ThemeContext';

export function ThemeToggle() {
    const { isDark, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all duration-200 ${
                isDark
                    ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700 border border-gray-700'
                    : 'bg-white/80 text-blue-600 hover:bg-gray-100 border border-gray-200'
            } shadow-lg`}
            type="button"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
            {isDark ? (
                <Sun className="size-5" />
            ) : (
                <Moon className="size-5" />
            )}
        </button>
    );
}