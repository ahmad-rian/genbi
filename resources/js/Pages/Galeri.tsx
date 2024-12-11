import MainLayout from '@/Layouts/MainLayout';
import { motion } from 'framer-motion';
import { useTheme } from '@/Hooks/useTheme';
import { useEffect, useState } from 'react';
import { FaCalendar, FaMapMarkedAlt, FaUser } from 'react-icons/fa';
import { changeDate } from '@/Utils/changeDate';
import { Link } from '@inertiajs/react';


const fadeInUpAnimation = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true }
};

const Galeri = () => {
    const { isDark } = useTheme();
    const [galeri, setGaleri] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://genbi-data.test/api/galeri`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
            setGaleri(result.data)
        } else {
            setError(result.message); // Tangkap error jika ada
            console.error("Error fetching data:", result.message);
        }

      } catch (error) {
        setError(error.message); // Tangkap error jika ada
        console.error("Fetch error:", error);
      }finally{
        setLoading(false); // Hentikan loading
      }
    };

    useEffect(() => {
        fetchData()
    }, []);

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

    if (loading) return(
        <div className='flex justify-center items-center flex-col fixed z-[999] right-[50%] top-[50%] translate-x-[50%] -translate-y-[50%] w-screen h-screen bg-white gap-3'>
            <img
                src='./images/logo.png'
                className="lg:w-1/4 w-[80%] h-[40%]"
                alt='icon-splash'
            />
            <div className="flex items-center justify-center">
                <img src="./images/Loader.svg" alt="loader image" className='w-10 mr-5' />
                <p>Sedang Memuat Data</p>
            </div>
        </div>
    );

  return (
    <MainLayout title="Galeri">
        <div className="lg:py-0 py-20 px-4 relative min-h-screen lg:pt-28 lg:pb-20">
            <div className="container mx-auto relative z-10">
                <motion.div {...fadeInUpAnimation} className="text-center mb-8">
                    <h1 className={`text-2xl sm:text-3xl font-bold ${styles.text}`}>Galeri Kegiatan GenBI</h1>
                    <p className={`mt-3 text-base sm:text-lg ${styles.text} opacity-80`}>
                    Kumpulan kegiatan dari GenBI Purwokerto
                    </p>
                    <div className="w-16 h-1 bg-blue-500 mx-auto mt-3" />
                </motion.div>
            </div>

            <div className="grid lg:grid-cols-3 grid-cols-1 md:gap-10 items-center">
                {galeri.map((item, index) => (
                    <Link key={index} href={`/galeri/${item.slug}`} className="p-4 bg-white rounded-lg shadow-sm">
                        <img
                        src={item.thumbnail ? `http://genbi-data.test/storage/${item.thumbnail}` : "./images/NO IMAGE AVAILABLE.jpg"}
                        alt={item.title}
                        className="w-full h-[200px] md:h-[270px] bg-cover rounded-lg mb-8"
                        />
                        <h2 className={`text-lg font-bold mb-2`}>{item.title}</h2>

                        <p className="text-gray-700 dark:text-gray-300 lg:text-base md:text-sm text-[12px] line-clamp-3">{item.deskripsi}</p>

                        <div className="mt-5 md:flex gap-10">
                            <p className="flex md:mb-0 mb-2 md:text-base text-[12px] gap-2 text-sm text-gray-600 dark:text-gray-400 items-center">
                                <FaMapMarkedAlt />
                                <span>Tempat : {item.tempat}</span>
                            </p>
                            <p className="flex gap-2 text-sm text-gray-600 dark:text-gray-400 items-center">
                                <FaCalendar />
                                <span>{changeDate(new Date(item.waktu))}</span>
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    </MainLayout>
  );
};



export default Galeri;
