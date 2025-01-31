import { useEffect, useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Link, Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Award, Users, Target } from 'lucide-react';
import { useTheme } from '@/Hooks/useTheme';
import Hero from '@/Components/Hero';
import AboutSection from '@/Components/AboutSection';
import {
  IconCalendar,
  IconPaper,
} from "@irsyadadl/paranoid";
import { FaCalendar, FaEye, FaMapMarkedAlt, FaUser } from 'react-icons/fa';
import {
  MdKeyboardDoubleArrowDown,
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { changeDate } from '@/Utils/changeDate';



const GenBIPointSection = ({ isDark }: { isDark: boolean }) => {
    const features = [
        {
            icon: Award,
            title: "Sistem Penghargaan",
            description: "Apresiasi khusus untuk kontribusi aktif anggota dalam komunitas"
        },
        {
            icon: Users,
            title: "Kolaborasi Tim",
            description: "Mendorong kerja sama dan partisipasi dalam kegiatan komunitas"
        },
        {
            icon: Target,
            title: "Pencapaian Terukur",
            description: "Pantau dan tingkatkan performa dengan metrik yang jelas"
        }
    ];

    return (
        <div className="relative py-24 overflow-hidden">
            <div className={`absolute inset-0 ${
                isDark
                    ? 'bg-gradient-to-br from-blue-950/20 via-gray-900/40 to-gray-950/20'
                    : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'
            }`} />

            <div className="container mx-auto px-4 lg:px-16 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className='order-2 lg:order-1'
                    >
                        <div className="space-y-6">
                            <div className="inline-block">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "100%" }}
                                    transition={{ duration: 0.6 }}
                                    className="bg-blue-600 h-1 w-16 mb-6"
                                />
                            </div>

                            <h2 className={`text-3xl lg:text-5xl font-bold lg:leading-tight ${
                                isDark ? 'text-white' : 'text-gray-900'
                            }`}>
                                GenBI Point
                            </h2>

                            <p className={`text-lg lg:text-xl ${
                                isDark ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                                Sistem penghargaan inovatif yang memberikan apresiasi kepada anggota GenBI atas kontribusi aktif dan partisipasi mereka dalam komunitas.
                            </p>

                            <div className="space-y-8 mt-12">
                                {features.map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="flex items-start space-x-4"
                                    >
                                        <div className={`p-3 rounded-lg ${
                                            isDark ? 'bg-blue-900/30' : 'bg-blue-50'
                                        }`}>
                                            <feature.icon className={`w-6 h-6 ${
                                                isDark ? 'text-blue-400' : 'text-blue-600'
                                            }`} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className={`text-lg font-semibold mb-1 ${
                                                isDark ? 'text-white' : 'text-gray-900'
                                            }`}>{feature.title}</h3>
                                            <p className={`${
                                                isDark ? 'text-gray-400' : 'text-gray-600'
                                            }`}>{feature.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                viewport={{ once: true }}
                                className="mt-8"
                            >
                                <Link
                                    href="/genbi-point"
                                    className={`group inline-flex items-center px-6 py-3 rounded-full font-semibold transition duration-300 ease-in-out hover:shadow-lg transform hover:-translate-y-1 ${
                                        isDark
                                            ? 'bg-blue-600 text-white hover:bg-blue-600'
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                                >
                                    Lihat Selengkapnya
                                    <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="relative order-1 lg:order-2"
                    >
                        <div className={`absolute inset-0 rounded-3xl ${
                            isDark
                                ? 'bg-gradient-to-br from-blue-600/10 to-purple-600/10'
                                : 'bg-gradient-to-br from-blue-100/50 to-purple-100/50'
                        } blur-3xl transform -rotate-6`} />
                        <img
                            src="./images/Hero Image GenBI Point.svg"
                            alt="GenBI Point Illustration"
                            className="relative w-full md:h-auto h-[300px] max-w-lg mx-auto transform hover:scale-105 transition-transform duration-500"
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

//@ts-ignore
export default function Home() {
    const { isDark } = useTheme();
    const [tabActive, setTabActive] = useState("news");
    const [moreNews, setMoreNews] = useState(false);
    const [artikel, setArtikel] = useState([]);
    const [event, setEvent] = useState([]);
    const [artikelPalingBaru, setArtikelPalingBaru] = useState();
    const [eror, setEror] = useState("");
    const [erorEvent, setErorEvent] = useState("");

    // Fetch artikel
    const fetchArtikel = async () => {

        try{
            const response = await fetch("https://data.genbipurwokerto.com/api/artikel/homeArtikel");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                const allArtikel = data.data;

                // Periksa tipe data
                if (!Array.isArray(allArtikel)) {
                    throw new Error("Artikel data is not an array");
                }

                //@ts-ignore
                setArtikelPalingBaru(allArtikel.slice(0, 1)); // Artikel paling baru
                setArtikel(allArtikel.slice(1)); // Artikel ke-2 dan seterusnya
            }
        }
        catch(error) {
            setEror(error)
            console.error("Error fetching artikel:", error);
        };
    };

    // Fetch event
    const fetchEvent = async () => {

        try{
            const response = await fetch("https://data.genbipurwokerto.com/api/event/homeEvent");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                setEvent(data.data)
            }
        }
        catch(error) {
            setErorEvent(error)
            console.error("Error fetching artikel:", error);
        };
    };

    // Initial fetch
    useEffect(() => {
        fetchArtikel();
        fetchEvent();
    }, []);

    if (artikel.length <= 0 && artikelPalingBaru === undefined && event.length <= 0) return(
        <div className='flex justify-center items-center flex-col fixed z-[999] right-[50%] top-[50%] translate-x-[50%] -translate-y-[50%] w-screen h-screen bg-white gap-3'>
            <img
                src='/images/logo.png'
                className="lg:w-1/4 w-[80%] h-[40%]"
                alt='icon-splash'
            />
            <div className="flex items-center justify-center">
                <img src="./images/Loader.svg" alt="loader image" className='w-10 mr-5' />
                <p>Sedang Memuat Data</p>
            </div>
        </div>
    );

    if (eror || erorEvent) return <p>Error: {eror}</p>;


    if (artikel.length > 0 && artikelPalingBaru !== undefined && event.length > 0) return (
        <MainLayout>
            <Head>
                <meta name="description" content="Selamat datang di GenBI Purwokerto, komunitas penerima beasiswa Bank Indonesia yang aktif menginspirasi dan berkontribusi untuk negeri. Temukan informasi kegiatan, program, dan kontribusi kami dalam membangun generasi muda yang berprestasi dan peduli terhadap masyarakat." />
                <meta name="keywords" content="genbi, genbi purwokerto,bank indonesia,bank indonesia purwokerto,beasiswa bank indonesia,genbi jawa tengah, genbi jateng,generasi baru indonesia, komunitas genbi,kegiatan sosial,pendidikan,investasi cerdas,energi untuk negeri,generasi muda berprestasi,genbi event,ekonomi kreatif,genbi purwokerto website."></meta>

                {/* <!-- Open Graph Meta Tags --> */}
                <meta property="og:title" content="GenBI Purwokerto - Generasi Baru Indonesia" />
                <meta property="og:description" content="GenBI Purwokerto adalah komunitas generasi muda yang diprakarsai oleh Bank Indonesia untuk mendukung pengembangan pendidikan, sosial, dan ekonomi di wilayah Purwokerto dan sekitarnya." />
                <meta property="og:image" content="https://genbipurwokerto.com/images/logo.png" />
                <meta property="og:url" content="https://genbipurwokerto.com" />
                <meta property="og:type" content="website" />

                {/* <!-- Twitter Meta Tags --> */}
                <meta name="twitter:title" content="GenBI Purwokerto - Generasi Baru Indonesia" />
                <meta name="twitter:description" content="GenBI Purwokerto adalah komunitas generasi muda yang diprakarsai oleh Bank Indonesia untuk mendukung pengembangan pendidikan, sosial, dan ekonomi di wilayah Purwokerto dan sekitarnya." />
                <meta name="twitter:image" content="https://genbipurwokerto.com/images/logo.png" />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>

            <Hero />

            {/* Bagian Tentang Kami */}
            <AboutSection isDark={isDark} />

            {/* GenBI Point Section */}
            <GenBIPointSection isDark={isDark} />

            <div className="lg:px-4 mt-10">
                <div className="mx-auto flex max-w-[1700px] space-x-[1px] lg:justify-center lg:space-x-6">

                    <button
                        className={[ tabActive === "news" ? "bg-blue-600 flex-1 text-white" : "bg-blue-50 text-blue-600 hover:bg-blue-100"  ," flex items-center px-4 py-3 text-sm font-semibold transition-colors md:text-base lg:rounded-t-xl lg:px-6  lg:flex-[unset]"].join("")}
                        onClick={() => {
                            setTabActive("news");
                        }}
                    >
                        <div className="relative h-6 w-6 lg:h-9 lg:w-9">
                        <IconPaper className="w-[30px] h-[30px]" />
                        </div>
                        <span className="ml-3 lg:ml-4 inline">Berita</span>
                    </button>

                    <button
                        className={[ tabActive !== "news" ? "bg-blue-600 flex-1 text-white" : "bg-blue-50 text-blue-600 hover:bg-blue-100"  ," flex items-center px-4 py-3 text-sm font-semibold transition-colors md:text-base lg:rounded-t-xl lg:px-6  lg:flex-[unset]"].join("")}
                        onClick={() => {
                        setTabActive("event");
                        }}
                    >
                        <div className="relative h-6 w-6 lg:h-9 lg:w-9">
                        <IconCalendar className="w-[30px] h-[30px]" />
                        </div>
                        <span className="ml-3 lg:ml-4 inline">Event</span>
                    </button>

                </div>
            </div>

            <section className="bg-blue-600 flex justify-center">
                {tabActive == "news" ? (
                    <div className="max-w-[1700px]">
                        {
                        //@ts-ignore
                        artikelPalingBaru.map((item:any, index:any) => (
                            <Link href={`/artikel/${item.slug}`} key={index}>
                                <div className="grid lg:grid-cols-5 gap-10 items-center lg:px-20 md:px-10 px-4 pt-10">
                                    <div className="h-[200px] md:h-[350px] w-full rounded-md overflow-hidden lg:col-span-2">
                                        <img
                                        src={item.thumbnail ? `https://data.genbipurwokerto.com/storage/${item.thumbnail}` : "./images/NO IMAGE AVAILABLE.jpg"}
                                        alt={item.title}
                                        className="object-cover h-full w-full"
                                        data-aos-once="true"
                                        data-aos="fade-left"
                                        />
                                    </div>
                                    <div
                                        className="lg:col-span-3"
                                        data-aos-once="true"
                                        data-aos="fade-right"
                                    >
                                        <h3 className="text-white font-semibold md:mb-5 mb-3 md:text-base text-sm uppercase">
                                        {item.kategori_artikel.nama}
                                        </h3>
                                        <Link href={`/artikel/${item.slug}`}>
                                        <h2 className="uppercase font-bold md:text-3xl text-xl text-white ">
                                            {item.title}
                                        </h2>
                                        </Link>
                                        <p className="mt-5 md:text-base text-[12px] text-white line-clamp-4">
                                            {item.excerpt}
                                        </p>
                                        <div className="flex gap-5 mt-10 text-white md:text-base text-sm">
                                        <span className="hidden md:flex gap-2 items-center">
                                            <FaEye />
                                            <small>{item.views} kali dilihat</small>
                                        </span>
                                        <span className="flex gap-2 items-center">
                                            <FaCalendar />
                                            <small>{changeDate(new Date(item.published_at))}</small>
                                        </span>
                                        <span className="flex gap-2 items-center">
                                            <FaUser />
                                            <small>Penulis : {item.user.name}</small>
                                        </span>
                                        </div>

                                    </div>
                                </div>
                            </Link>
                        ))}
                            {moreNews ? (
                            <>
                                <section className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-10 md:px-20 px-4 mt-10">
                                {artikel.map((item) => (
                                    <div className="mt-5">
                                        <img
                                        src={item.thumbnail ? `https://data.genbipurwokerto.com/storage/${item.thumbnail}` : "./images/NO IMAGE AVAILABLE.jpg"}
                                        alt={item.title}
                                        className="h-[200px] sm:h-[250px] object-cover w-full rounded"
                                        />

                                        <Link href={`/artikel/${item.slug}`}>
                                        <h3 className="mt-3 text-xl font-bold text-white line-clamp-2">
                                            {item.title}
                                        </h3>
                                        </Link>
                                        <div className="my-3 md:my-5 flex gap-5">
                                        <span className="flex gap-2 items-center text-white">
                                            <FaUser />
                                            <small>{item.user.name}</small>
                                        </span>
                                        <span className="flex gap-2 items-center text-white">
                                            <FaCalendar />
                                            <small>{changeDate(new Date(item.published_at))}</small>
                                        </span>
                                        </div>
                                        <p className="text-white line-clamp-4 mt-2 text-sm">
                                            {item.excerpt}
                                        </p>
                                    </div>
                                ))}

                                </section>
                                <div className="flex flex-wrap justify-center text-center pb-10 ">
                                <button
                                    className="w-full sm:w-[unset] mx-3 sm:mx-0 bg-white border-2 border-white hover:bg-slate-200 hover:border-blue-400 text-blue-600 text-sm sm:px-5 py-2 mt-10 rounded-full inline-flex items-center justify-center sm:gap-2 "
                                    onClick={() => {
                                    setMoreNews(false);
                                    }}
                                >
                                    {"Lebih Sedikit"}
                                    <MdKeyboardDoubleArrowUp className="ml-5" />
                                </button>
                                <Link
                                    href={"/artikel"}
                                    className="w-full sm:w-[unset] mx-3 sm:mx-0 border-2 border-white hover:bg-white text-white hover:text-blue-600 text-sm sm:px-5 py-2 mt-10 rounded-full inline-flex items-center sm:gap-2 justify-center md:ml-5"
                                >
                                    {"Semua Berita"}
                                    <MdKeyboardDoubleArrowRight className="ml-5" />
                                </Link>
                                </div>
                        </>
                        ) : (
                        <div className="text-center pb-10 lg:block">
                            <button
                            className="bg-white hover:bg-blue-400 text-blue-600 mx-auto text-sm px-5 py-2 mt-10 rounded-full inline-flex items-center gap-2"
                            onClick={() => {
                                setMoreNews(true);
                            }}
                            >
                            {"Lihat Lainnya"}
                            <MdKeyboardDoubleArrowDown />
                            </button>
                        </div>
                        )}
                    </div>
                ) : (
                    <div className="max-w-[1700px] py-10 lg:px-10 px-3 grid lg:grid-cols-3 grid-cols-1 gap-0 md:gap-10 items-center">
                        {event.length > 0 && event.map((item, index) => (
                            <Link key={index} href={`/event/${item.slug}`} className="bg-white rounded-lg shadow-sm mb-5 md:mb-0">
                                <img
                                src={item.image ? `https://data.genbipurwokerto.com/storage/${item.image}` : "./images/NO IMAGE AVAILABLE.jpg"}
                                alt={item.nama}
                                className="w-full h-[200px] md:h-[270px] object-cover rounded-lg mb-8"
                                />
                                <h2 className={`px-4 text-lg font-bold mb-2`}>{item.nama}</h2>

                                <p className="px-4 text-gray-700 dark:text-gray-300 lg:text-base md:text-sm text-[12px] line-clamp-3">{item.excerpt}</p>

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
            </section>

            {/* Company Profile Video Section */}
            <section className="py-20 px-4 relative">
                <div className={`absolute inset-0 ${
                    isDark
                        ? 'bg-gradient-to-b from-transparent via-gray-800/30 to-transparent'
                        : 'bg-gradient-to-b from-transparent via-blue-50/30 to-transparent'
                }`} />
                <div className="container mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className={`md:text-4xl text-3xl font-bold ${
                            isDark ? 'text-white' : 'text-gray-900'
                        }`}>COMPANY PROFILE</h2>
                        <div className="w-16 h-1 bg-blue-600 mx-auto mt-4"></div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className={`relative rounded-xl overflow-hidden shadow-2xl p-4 ${
                            isDark
                                ? 'bg-gray-800/70 backdrop-blur-sm'
                                : 'bg-white/70 backdrop-blur-sm'
                        }`}>
                            <div className="aspect-video relative">
                                <iframe
                                    className="w-full h-full rounded-lg bg-slate-500"
                                    src="https://www.youtube.com/embed/x7xMqTNOR9Y"
                                    title="Company Profile GENBI Purwokerto"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div className="mt-4 flex items-center justify-center gap-4">
                                <a
                                    href="https://youtu.be/x7xMqTNOR9Y?si=rFrrHlFUYYwGGKAT"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`group inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${
                                        isDark
                                            ? 'bg-blue-600 text-white hover:bg-blue-600'
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                                >
                                    <Play size={20} />
                                    <span>Tonton di YouTube</span>
                                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>




        </MainLayout>
    );
}
