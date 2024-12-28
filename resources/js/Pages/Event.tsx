import MainLayout from '@/Layouts/MainLayout';
import { motion } from 'framer-motion';
import { useTheme } from '@/Hooks/useTheme';
import { useEffect, useState } from 'react';
import { FaCalendar, FaMapMarkedAlt } from 'react-icons/fa';
import { changeDate } from '@/Utils/changeDate';
import { Link } from '@inertiajs/react';


const fadeInUpAnimation = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true }
};


const Event = () => {
    const { isDark } = useTheme();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tabActive, setTabActive] = useState("Semua Kegiatan");

        const fetchData = async () => {
      try {
        const response = await fetch(
          `https://genbi-data.test/api/event`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
            setEvents(result.data)
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

    // Filter data berdasarkan tab aktif
    const filteredEvents = events.filter((event) => {
        if (tabActive === "Semua Kegiatan") {
            return true;
        } else if (tabActive === "Sedang Berlangsung") {
            return event.status === "Pendaftaran Masih Dibuka";
        } else if (tabActive === "Sudah Berakhir") {
            return event.status === "Event Sudah Berakhir";
        }
        // Tambahkan filter lainnya sesuai kebutuhan
        return false;
    });

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

    if (error) return <p>Error: {error}</p>;

  return (
    <MainLayout title="Event">
        <div className="lg:py-0 py-20 px-4 relative min-h-screen lg:pt-28 lg:pb-20">
            <div className="container mx-auto relative z-10">
                <motion.div {...fadeInUpAnimation} className="text-center mb-8">
                    <h1 className={`text-2xl sm:text-3xl font-bold ${styles.text}`}>Semua Kegiatan GenBI</h1>
                    <div className="mt-10 flex justify-center">
                        <button
                        onClick={() => {
                            setTabActive("Semua Kegiatan");
                        }}
                        className={`px-4 py-2 mx-2 rounded-lg
                            ${tabActive === "Semua Kegiatan" ? "bg-blue-600 text-white" : "active:bg-gray-300"}`}
                        >
                            <span className="font-semibold">Semua Kegiatan</span>
                        </button>

                        <button
                        onClick={() => {
                            setTabActive("Sedang Berlangsung");
                        }}
                        className={`px-4 py-2 mx-2 rounded-lg
                            ${tabActive === "Sedang Berlangsung" ? "bg-blue-600 text-white" : "active:bg-gray-300"}`}
                        >
                            <span className="font-semibold">Sedang Berlangsung</span>
                        </button>

                        <button
                        onClick={() => {
                            setTabActive("Sudah Berakhir");
                        }}
                        className={`px-4 py-2 mx-2 rounded-lg
                            ${tabActive === "Sudah Berakhir" ? "bg-blue-600 text-white" : "active:bg-gray-300"}`}
                        >
                            <span className="font-semibold">Sudah Berakhir</span>
                        </button>
                    </div>
                </motion.div>

                {!loading && !error && filteredEvents.length >= 1 && (
                    <div className="grid lg:grid-cols-3 grid-cols-1 md:gap-10 items-center">
                    {filteredEvents.map((item, index) => (
                        <Link key={index} href={`/event/${item.slug}`} className="bg-white rounded-lg shadow-sm">
                            <img
                            src={item.image ? `https://data.genbipurwokerto.com/storage/${item.image}` : "./images/NO IMAGE AVAILABLE.jpg"}
                            alt={item.nama}
                            className="w-full h-[200px] md:h-[270px] bg-cover rounded-lg mb-8"
                            />
                            <h2 className={`px-4 text-lg font-bold mb-2`}>{item.nama}</h2>

                            <p className="text-gray-700 dark:text-gray-300 lg:text-base md:text-sm text-[12px] line-clamp-3">{item.excerpt}</p>

                            <div className="mt-5 md:flex gap-10 px-4 pb-4">
                                <p className="flex md:mb-0 mb-2 md:text-base text-[12px] gap-2 text-sm text-gray-600 dark:text-gray-400 items-center">
                                    <FaMapMarkedAlt />
                                    <span>{item.tempat}</span>
                                </p>
                                <p className="flex gap-2 text-sm text-gray-600 dark:text-gray-400 items-center">
                                    <FaCalendar />
                                    <span>{changeDate(new Date(item.tanggal))}</span>
                                </p>
                            </div>

                            <div
                            className={`p-5 rounded-b-lg text-center
                                ${item.status === "Event Sudah Berakhir" ? "bg-red-100 text-red-500" : "bg-green-100 text-green-600"}
                            `}>
                                <p className={`dark:text-gray-300 lg:text-base md:text-sm text-[12px] font-semibold`}>{item.status}</p>
                            </div>
                        </Link>
                    ))}
                    </div>
                )}
            </div>
        </div>
    </MainLayout>
  );
};



export default Event;
