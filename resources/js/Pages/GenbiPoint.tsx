import { useEffect, useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { motion } from 'framer-motion';
import { useTheme } from '@/Hooks/useTheme';
import HeroGenBIPoint from '@/Components/HeroGenBIPoint';
import { IconCalendarDays, IconClipboard, IconListBullets, IconTrophy } from '@irsyadadl/paranoid';

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";


export default function GenBIPoint() {
    const { isDark } = useTheme();
    const [openLightboxDeputi, setOpenLightboxDeputi] = useState(false);
    const [openLightboxStaff, setOpenLightboxStaff] = useState(false);
    const [SOTMDeputi, setSOTMDeputi] = useState();
    const [SOTMStaff, setSOTMStaff] = useState();
    const [lightboxDeputi, setLightboxDeputi] = useState([]);
    const [lightboxStaff, setLightboxStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    // Fungsi untuk fetch data
    const fetchData = async () => {
        try {
            const response = await fetch("http://genbi-data.test/api/sotm");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            // Pisahkan data berdasarkan jenis
            const deputi = data.data.filter((item) => item.jenis === "deputi");
            const staff = data.data.filter((item) => item.jenis === "staff");

            // Proses data ke dalam format yang diinginkan
            const deputiImages = data.data
            .filter((item) => item.jenis === "deputi")
            .map((item) => ({ src: `http://genbi-data.test/storage/${item.image}` }));

            const staffImages = data.data
            .filter((item) => item.jenis === "staff")
            .map((item) => ({ src: `http://genbi-data.test/storage/${item.image}` }));

            // Simpan ke state
            setLightboxDeputi(deputiImages);
            setLightboxStaff(staffImages);

            setSOTMDeputi(deputi);
            setSOTMStaff(staff);
        } catch (err) {
            setError(err.message); // Tangkap error jika ada
        } finally {
            setLoading(false); // Hentikan loading
        }
    };

    fetchData();
    }, []); // Array kosong memastikan ini hanya dijalankan sekali

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error: {error}</p>;


    const missionItems = [
        {
            icon:<IconListBullets className="w-10 h-10" />,
            title: "Kegiatan",
            description: "Fitur ini menyediakan informasi lengkap tentang kegiatan yang direncanakan atau telah dilaksanakan. Anggota dapat melihat jadwal, deskripsi kegiatan, dan laporan pelaksanaan, sehingga memudahkan koordinasi dan partisipasi.",
            gradient: "from-blue-500 to-blue-600"
        },
        {
            icon:<IconCalendarDays className="w-10 h-10" />,
            title: "Penilaian Deputi",
            description: "Fitur ini memungkinkan penilaian kinerja deputi secara objektif dan transparan. Deputi dapat dinilai berdasarkan parameter tertentu, dengan skor yang diperoleh digunakan untuk evaluasi performa.",
            gradient: "from-blue-500 to-blue-600"
        },
        {
            icon:<IconClipboard className="w-10 h-10"/>,
            title: "Absensi",
            description: "Fitur absensi dirancang untuk mencatat kehadiran anggota pada setiap kegiatan atau rapat. Data kehadiran ini berguna untuk evaluasi keaktifan anggota dan memastikan partisipasi optimal dalam komunitas.",
            gradient: "from-blue-500 to-blue-600"
        },
        {
            icon:<IconTrophy className="w-10 h-10"/>,
            title: "Ranking (Deputi dan Staff)",
            description: "Fitur ini menampilkan peringkat deputi dan staf berdasarkan skor penilaian atau pencapaian mereka. Ranking ini diupdate secara otomatis dan dapat digunakan untuk memberikan apresiasi kepada anggota dengan performa terbaik.",
            gradient: "from-blue-500 to-blue-600"
        }
    ];


    return (
        <MainLayout title="GenBI Point">
            <HeroGenBIPoint />

            <main className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <section className="mb-24">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className={`text-3xl font-bold inline-flex items-center gap-4 ${
                        isDark ? 'text-blue-400' : 'text-blue-800'
                        }`}>
                        <div className="h-1 w-12 bg-gradient-to-r from-transparent to-blue-500 rounded-full" />
                        Fitur
                        <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {missionItems.map((item, index) => (
                            <motion.div
                                key={index}
                                className="group relative"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                                <div className={`relative p-8 rounded-2xl md:min-h-[350px] shadow-md hover:shadow-lg transition-all duration-300 border ${
                                isDark
                                    ? 'bg-gray-800 border-gray-700'
                                    : 'bg-white border-gray-100'
                                }`}>
                                    <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                        {item.icon}
                                    </div>
                                    <h3 className={`text-xl font-semibold mb-4 ${
                                        isDark ? 'text-white' : 'text-gray-800'
                                    }`}>{item.title}</h3>
                                    <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section className="mb-24">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className={`text-3xl font-bold inline-flex items-center gap-4 ${
                        isDark ? 'text-blue-400' : 'text-blue-800'
                        }`}>
                        <div className="h-1 w-12 bg-gradient-to-r from-transparent to-blue-500 rounded-full" />
                        SOTM Deputi
                        <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {SOTMDeputi.map((item, index) => (
                            <div
                            key={index}
                            onClick={() => setOpenLightboxDeputi(true)}
                            className="flex justify-center items-center cursor-pointer"
                            >
                                <img
                                    src={"http://genbi-data.test/storage/" + item.image}
                                    className="rounded-xl lg:h-[500px] h-[350px] w-full object-cover bg-gray-300"
                                />
                            </div>
                        ))}
                        <Lightbox
                        open={openLightboxDeputi}
                        close={() => setOpenLightboxDeputi(false)}
                        slides={lightboxDeputi}
                        />
                    </div>
                </section>

                <section className="mb-24">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className={`text-3xl font-bold inline-flex items-center gap-4 ${
                        isDark ? 'text-blue-400' : 'text-blue-800'
                        }`}>
                        <div className="h-1 w-12 bg-gradient-to-r from-transparent to-blue-500 rounded-full" />
                        SOTM Staff
                        <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {SOTMStaff.map((item, index) => (
                            <div
                            key={index}
                            onClick={() => setOpenLightboxStaff(true)}
                            className="flex justify-center items-center cursor-pointer"
                            >
                                <img
                                    src={"http://genbi-data.test/storage/" + item.image}
                                    className="rounded-xl lg:h-[500px] h-[350px] w-full object-cover bg-gray-300"
                                />
                            </div>
                        ))}
                        <Lightbox
                        open={openLightboxStaff}
                        close={() => setOpenLightboxStaff(false)}
                        slides={lightboxStaff}
                        />
                    </div>
                </section>
            </main>


        </MainLayout>
    )
}
