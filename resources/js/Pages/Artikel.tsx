import { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';

import MainLayout from '@/Layouts/MainLayout';

import {
  FaArrowRight,
  FaCalendar,
  FaEnvelope,
  FaFire,
  FaMapMarkedAlt,
  FaUser,
} from "react-icons/fa";

import backgroundImageArtikel from "../../../public/images/NO IMAGE AVAILABLE.jpg"



// import Swiper JS
import {Swiper, SwiperSlide} from 'swiper/react';
// import Swiper styles
import 'swiper/css';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { changeDate } from '@/Utils/changeDate';



const Artikel = () => {
    const [artikelPalingBaru, setArtikelPalingBaru] = useState([]);
    const [artikelBaru, setArtikelBaru] = useState([]);
    const [artikel, setArtikel] = useState([]);
    const [artikelRekomendasi, setArtikelRekomendasi] = useState([]);
    const [artikelTrending, setArtikelTrending] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loadingArtikel, setLoadingArtikel] = useState(true);
    const [loadingRekomendasi, setLoadingRekomendasi] = useState(true);
    const [loadingTrendingArtikel, setLoadingTrendingArtikel] = useState(true);
    const [eror, setEror] = useState();
    const [countTrandingArtikel, setCountTrandingArtikel] = useState(1);

    const link = "http://genbi-data.test/api/artikel?page=";


    // Fetch artikel
    const fetchArtikel = async () => {

        try{
            const response = await fetch(link+lastPage);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                const allArtikel = data.data.data;

                // Periksa tipe data
                if (!Array.isArray(allArtikel)) {
                    throw new Error("Artikel data is not an array");
                }

                if (lastPage === 1) {
                    setArtikelPalingBaru(allArtikel.slice(0, 1)); // Artikel paling baru
                    setArtikelBaru(allArtikel.slice(1, 3)); // Artikel ke-2 & ke-3
                    setArtikel(allArtikel.slice(3)); // Artikel ke-4 dan seterusnya
                } else {
                    setArtikel((prevArtikel) => [...prevArtikel, ...allArtikel]);
                }

                setLoadingArtikel(false)
            }
        }
        catch(error) {
            setEror(error)
            console.error("Error fetching artikel:", error);
        }finally{
        };
    };

    // Fetch rekomendasi artikel
    const fetchRekomendasi = async () => {
        try{
            const response = await fetch("http://genbi-data.test/api/artikel/rekomendasi")

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();

            if (data.success) {
                const artikelRekomendasiData = data.data;
                setArtikelRekomendasi(artikelRekomendasiData);
            }
        }catch(error){
            setEror(error)
            console.error("Error fetching rekomendasi:", error)
        }finally{
            setLoadingRekomendasi(false)
        }
    };

    const fetchTrendingArtikel = async () => {
        try {
            const response = await fetch("http://genbi-data.test/api/artikel/trending-monthly");

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            if (data.success) {
                setArtikelTrending(data.data); // Simpan data ke state
            }
        } catch (error) {
            console.error("Error fetching trending artikel:", error);
            setEror(error);
        }finally{
            setLoadingTrendingArtikel(false)
        }
    };

    // Initial fetch
    useEffect(() => {
        fetchArtikel();
    }, [lastPage]);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            setLastPage(prev => prev + 1)
        }
    }

    useEffect(() => {
        fetchTrendingArtikel(); // Panggil fungsi fetch
        fetchRekomendasi();
        window.addEventListener("scroll", handleScroll);

        if (window.innerWidth <= 500) {
            setCountTrandingArtikel(1)
        }else if(window.innerWidth > 500 && window.innerWidth <= 700){
            setCountTrandingArtikel(2)
        }else if(window.innerWidth > 700 && window.innerWidth <= 1000){
            setCountTrandingArtikel(3)
        }else if(window.innerWidth > 700){
            setCountTrandingArtikel(4)
        }

        return () => window.removeEventListener("scroll", handleScroll)
    }, []);

    if (loadingArtikel && loadingRekomendasi && loadingTrendingArtikel) return(
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

    if (eror) return <p>Error: {eror}</p>;


  return (

    <MainLayout title="Artikel">


        <header className="mt-10 mx-auto grid lg:grid-cols-4 gap-10 pt-20 lg:px-20 md:px-5 px-3">
            <span
                className="w-[1000px] h-[1000px] rounded-full absolute -left-[500px] -top-[500px] -rotate-[60deg]"
                style={{
                backgroundImage:
                    "radial-gradient(169.40% 89.55% at 94.76% 6.29%, rgba(29,79,217, 0.70) 0%, rgba(239, 68, 68, 0.0) 100%)",
                }}
            ></span>

            {
            artikelPalingBaru.length >= 0 ? artikelPalingBaru.map((item, index) => (
                <Link
                href={`/artikel/${item.slug}`}
                key={index}
                className="lg:col-span-3 lg:h-[600px] md:h-[400px] h-[300px] bg-cover relative z-10 flex items-end md:p-10 p-4 after:content-[''] after:absolute after:inset-0 after:bg-black/40 after:-z-10 bg-bottom rounded overflow-hidden"
                style={{
                    backgroundImage: item.thumbnail !== null ? `url(http://genbi-data.test/storage/${item.thumbnail})` : `url(${backgroundImageArtikel})`,
                }}
                >
                <div className="w-[80%]">
                    <h6 className="text-red-500 md:mb-3 mb-1 font-semibold md:text-base text-sm">
                    {item.kategori_artikel.nama}
                    </h6>
                    <h2 className="lg:text-3xl md:text-2xl font-bold text-white ">
                        {item.title}
                    </h2>
                    <p className="text-gray-200 mt-3 text-sm lg:block hidden">
                    {item.excerpt}
                    </p>
                </div>
                </Link>
            )):(
                <h1>No Artikel</h1>
            )
            }
            <div className="md:grid hidden lg:grid-cols-1 lg:gap-0 gap-10">
                {/* Artikel Baru ke-2 & ke-3 */}
                {artikelBaru.map((item, index) => (
                    <Link href={`/artikel/${item.slug}`} key={index}>
                        <img
                        src={item.thumbnail ? `http://genbi-data.test/storage/${item.thumbnail}` : "./images/NO IMAGE AVAILABLE.jpg"}
                        alt={item.title}
                        className="bg-gray-300 rounded-xl h-[200px] object-cover"
                        />
                        <h3 className="font-bold mt-2 dark:text-gray-200">{item.title}</h3>
                    </Link>
                ))}
            </div>
        </header>

        <main className="mx-auto mt-20 lg:px-20 md:px-10 px-3">
            <section>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-10">
                    <div className="col-span-4">

                        <div className="flex justify-between items-center mb-5">
                            <span className="flex gap-2 items-center text-red-500 text-xl font-semibold">
                                <FaFire />
                                <h2>TRENDING</h2>
                            </span>
                            <span className="flex items-center gap-2 text-sm hover:underline dark:text-gray-200">
                                <a href="#">View More</a>
                                <FaArrowRight size={13} />
                            </span>
                        </div>

                        <div className="">
                            <Swiper
                                modules={[Navigation, Pagination]}
                                spaceBetween={30}
                                slidesPerView={countTrandingArtikel}
                                navigation
                                pagination={{ clickable: true }}
                                loop={true}
                                className="mx-auto"
                                // className='w-full'
                            >
                                {artikelTrending.map((item, index) => (

                                    <SwiperSlide key={index}>
                                        <Link href={`/artikel/${item.slug}`}>
                                            <img
                                                src={item.thumbnail ? `http://genbi-data.test/storage/${item.thumbnail}` : "./images/NO IMAGE AVAILABLE.jpg"}
                                                alt={item.title}
                                                className="bg-gray-300 rounded-xl h-[200px] object-cover w-full"
                                            />
                                            <h3 className="font-bold mt-2 dark:text-gray-200 line-clamp-2">{item.title}</h3>
                                        </Link>

                                    </SwiperSlide>
                                ))}

                            </Swiper>

                        </div>

                    </div>
                </div>
            </section>
            <hr className="my-10 dark:border-gray-800" />
            <section className="grid lg:grid-cols-4 gap-20 mt-10">
                <div className="lg:col-span-3 md:w-auto w-full mb-32">
                    {/* Artikel ke-4 dan seterusnya */}
                    <div className="mb-20">
                        {loadingArtikel && (
                            <div className="flex items-center justify-center">
                                <img src="./images/Loader.svg" alt="loader image" className='w-10' />
                                <p>Sedang Mangambil Data</p>
                            </div>
                        )}

                        {artikel.map((item, index) => (
                            <Link
                            href={`/artikel/${item.slug}`}
                            key={index}
                            className="md:grid md:grid-cols-5 items-center lg:gap-10 md:gap-5  md:mb-5 mb-16"
                            >
                                <div className="md:col-span-2">
                                    <img
                                    src={item.thumbnail ? `http://genbi-data.test/storage/${item.thumbnail}` : "./images/NO IMAGE AVAILABLE.jpg"}
                                    className="bg-gray-300 w-full h-[250px] rounded object-cover"
                                    alt={item.title}
                                    />
                                </div>
                                <div className="md:col-span-3 mb-10 md:mb-0">
                                    <small className="text-purple-500 font-semibold">
                                    {item.kategori_artikel.nama}
                                    </small>
                                    <h3 className="text-xl line-clamp-3 font-bold mb-3 dark:text-gray-200">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-700 line-clamp-4 dark:text-gray-300 lg:text-base md:text-sm text-[12px]">
                                    {item.excerpt}
                                    </p>
                                    <div className="mt-5 md:flex gap-10">
                                    <p className="flex md:mb-0 mb-2 md:text-base text-[12px] gap-2 text-sm text-gray-600 dark:text-gray-400 items-center">
                                        <FaUser />
                                        <span>Penulis : {item.user.name}</span>
                                    </p>
                                    <p className="flex gap-2 text-sm text-gray-600 dark:text-gray-400 items-center">
                                        <FaCalendar />
                                        <span>{changeDate(new Date(item.published_at))}</span>
                                    </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                </div>


                <div className="lg:block hidden">
                    <h2 className='text-red-500 text-xl font-semibold mb-10'>REKOMENDASI</h2>
                    {/* Artikel Rekomendasi */}
                    {artikelRekomendasi.map((item) => (
                        <Link href={`/artikel/${item.slug}`} key={item.id} className="mb-10">
                            <img
                            src={item.thumbnail ? `http://genbi-data.test/storage/${item.thumbnail}` : "./images/NO IMAGE AVAILABLE.jpg"}
                            alt={item.title}
                            className="bg-gray-300 rounded-xl h-[200px] object-cover"
                            />
                            <h3 className="font-bold mt-2 line-clamp-2 dark:text-gray-200">{item.title}</h3>
                        </Link>
                    ))}
                </div>
            </section>
        </main>

    </MainLayout>
  );
};

export default Artikel;
