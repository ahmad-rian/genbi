import { useTheme } from '@/Hooks/useTheme';
import MainLayout from '@/Layouts/MainLayout';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

const fadeInUpAnimation = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true }
};

const SejarahKepengurusan = () => {
    const { isDark } = useTheme();

    const styles = {
        gradient: isDark
            ? 'bg-gradient-to-b from-transparent via-gray-800/30 to-transparent'
            : 'bg-gradient-to-b from-transparent via-blue-50/30 to-transparent',
        text: isDark ? 'text-white' : 'text-gray-900',
        container: isDark
            ? 'bg-gray-800/70 backdrop-blur-sm'
            : 'bg-white/70 backdrop-blur-sm',
        button: isDark
            ? 'bg-blue-600 text-white hover:bg-blue-500'
            : 'bg-blue-600 text-white hover:bg-blue-700'
    };

    const kepengurusan = [
        {
            nama:"Kepengurusan GenBI Purwokerto 2024-2025",
            periode:"2024-2025"
        }
    ]

  return (
    <MainLayout title="SejarahKepengurusan">
        <div className="lg:py-0 py-20 px-4 relative min-h-screen lg:pt-28 lg:pb-20">
            <div className="container mx-auto relative z-10">
                <motion.div {...fadeInUpAnimation} className="text-center mb-8">
                    <h1 className={`text-2xl sm:text-3xl font-bold ${styles.text}`}>Sejarah Kepengurusan GenBI</h1>
                    <p className={`mt-3 text-base sm:text-lg ${styles.text} opacity-80`}>
                    Setiap waktu ada masanya, setiap masa ada waktunya.<br />Inilah para alumni kepengurusan GenBI Purwokerto dari tahun ke tahun
                    </p>
                    <div className="w-16 h-1 bg-blue-500 mx-auto mt-3" />
                </motion.div>
            </div>

            <div className="grid lg:grid-cols-3 grid-cols-1 md:gap-10 items-center">
                {kepengurusan.map((item, index) => (
                    <Link key={index} href={`/organisasi/struktur/${item.periode}`} className="p-4 bg-white rounded-lg shadow-md">
                        <img
                        src="../images/logo.png"
                        alt="Logo GenBI Purwokerto"
                        className="w-full lg:h-[350px] h-[250px] bg-cover rounded-lg mb-8"
                        />
                        <h2 className={`text-lg font-bold mb-2`}>{item.nama}</h2>

                        <p className="text-gray-700 dark:text-gray-300 lg:text-base md:text-sm text-[12px] line-clamp-3">Periode : {item.periode}</p>

                    </Link>
                ))}
            </div>
        </div>
    </MainLayout>
  );
};



export default SejarahKepengurusan;
