import MainLayout from '@/Layouts/MainLayout';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {
  FaArrowRight,
  FaCalendar,
  FaEnvelope,
  FaFire,
  FaMapMarkedAlt,
} from "react-icons/fa";




const Artikel = () => {
    const [artikelPalingBaru, setArtikelPalingBaru] = useState([]);
    const [artikelBaru, setArtikelBaru] = useState([]);
    const [artikel, setArtikel] = useState([]);
    const [artikelRekomendasi, setArtikelRekomendasi] = useState([]);
    const [artikelTrending, setArtikelTrending] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [eror, setEror] = useState();

    const link = "http://genbi-data.test/api/artikel?page=";


    // Initial fetch
    useEffect(() => {
        // Fetch artikel
        const fetchArtikel = async (page = 1) => {

            try{
                const response = await fetch(link+page);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                setIsLoading(true);
                if (data.success) {
                    const allArtikel = data.data.data;
                    // Periksa tipe data
                    if (!Array.isArray(allArtikel)) {
                        throw new Error("Artikel data is not an array");
                    }

                    if (page === 1) {
                        setArtikelPalingBaru(allArtikel.slice(0, 1)); // Artikel paling baru
                        setArtikelBaru(allArtikel.slice(1, 3)); // Artikel ke-2 & ke-3
                        setArtikel(allArtikel.slice(3)); // Artikel ke-4 dan seterusnya
                    } else {
                        setArtikel((prevArtikel) => [...prevArtikel, ...allArtikel]);
                    }

                    setCurrentPage(data.data.current_page);
                    setLastPage(data.data.last_page);
                }
                setIsLoading(false);
            }
            catch(error) {
                setEror(error)
                console.error("Error fetching artikel:", error);
                setIsLoading(false);
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
                setIsLoading(false);
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
            }
        };

        fetchTrendingArtikel(); // Panggil fungsi fetch
        fetchArtikel();
        fetchRekomendasi();
    }, []);

    // Load more artikel
    const loadMore = () => {
        if (currentPage < lastPage) {
            fetchArtikel(currentPage + 1);
        }
    };


    // if (isLoading) return <p>Loading...</p>;

    // if (eror) return <p>Error: {eror}</p>;


  return (

    <MainLayout title="Artikel">

        <header className="mt-10 mx-auto grid lg:grid-cols-4 gap-10 pt-20 lg:px-20 md:px-5 px-3">
            <span
                className="w-[1000px] h-[1000px] rounded-full absolute -left-[500px] -top-[500px] -rotate-[60deg]"
                style={{
                backgroundImage:
                    "radial-gradient(169.40% 89.55% at 94.76% 6.29%, rgba(239, 68, 68, 0.70) 0%, rgba(239, 68, 68, 0.0) 100%)",
                }}
            ></span>

            {
            artikelPalingBaru.length >= 0 ? artikelPalingBaru.map((item) => (
                <div
                key={item.id}
                className="lg:col-span-3 lg:h-[600px] md:h-[400px] h-[300px] bg-cover relative z-10 flex items-end md:p-10 p-4 after:content-[''] after:absolute after:inset-0 after:bg-black/40 after:-z-10 bg-bottom rounded overflow-hidden"
                style={{
                    backgroundImage: `url(http://genbi-data.test/storage/${item.thumbnail})`,
                }}
                >
                <div className="w-[80%]">
                    <h6 className="text-red-500 md:mb-3 mb-1 font-semibold md:text-base text-sm">
                    KATEGORI {item.kategori_id}
                    </h6>
                    <Link to={`/news/read/${item.slug}`}>
                    <h2 className="lg:text-3xl md:text-2xl font-bold text-white ">
                        {item.title}
                    </h2>
                    </Link>
                    <p className="text-gray-200 mt-3 text-sm lg:block hidden">
                    {item.excerpt}
                    </p>
                </div>
                </div>
            )):(
                <h1>No Artikel</h1>
            )
            }
            <div className="md:grid hidden lg:grid-cols-1 grid-cols-2 lg:gap-0 gap-10">
                {/* Artikel Baru ke-2 & ke-3 */}
                {artikelBaru.map((item) => (
                    <div key={item.id}>
                        <img
                        src={`http://genbi-data.test/storage/${item.thumbnail}`}
                        alt={item.title}
                        className="bg-gray-300 rounded-xl h-[200px] object-cover"
                        />
                        <Link to={`/news/read/${item.slug}`}>
                        <h3 className="font-bold mt-2 dark:text-gray-200">{item.title}</h3>
                        </Link>
                    </div>
                ))}
            </div>
        </header>

        <main className="mx-auto mt-20 lg:px-20 md:px-10 px-3">
            <section>
                <div className="grid lg:grid-cols-4 md:gap-10">
                    <div className="lg:col-span-4">

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

                        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
                            {artikelTrending.map((item, index) => (
                                <div key={index}>
                                    <img
                                        src={`http://genbi-data.test/storage/${item.thumbnail}`}
                                        alt={item.title}
                                        className="bg-gray-300 rounded-xl h-[200px] object-cover"
                                    />
                                    <Link to={`/news/read/${item.slug}`}>
                                        <h3 className="font-bold mt-2 dark:text-gray-200 line-clamp-2">{item.title}</h3>
                                    </Link>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </section>
            <hr className="my-10 dark:border-gray-800" />
            <section className="grid lg:grid-cols-4 gap-20 mt-10">
                <div className="lg:col-span-3 md:w-auto w-[95%] mb-32">
                {/* Artikel ke-4 dan seterusnya */}
                <div className="mb-20">
                    {artikel.map((item) => (
                        <div
                        key={item.id}
                        className="md:grid md:grid-cols-5 items-center lg:gap-10 md:gap-5 md:mb-5 mb-16"
                        >
                            <div className="md:col-span-2">
                                <img
                                src={`http://genbi-data.test/storage/${item.thumbnail}`}
                                className="bg-gray-300 w-full h-[250px] rounded object-cover"
                                alt={item.title}
                                />
                            </div>
                            <div className="md:col-span-3">
                                <small className="text-purple-500 font-semibold">
                                Kategori {item.kategori_id}
                                </small>
                                <Link to={`/news/read/${item.slug}`}>
                                <h3 className="text-xl font-bold mb-3 dark:text-gray-200">
                                    {item.title}
                                </h3>
                                </Link>
                                <p className="text-gray-700 dark:text-gray-300 lg:text-base md:text-sm text-[12px]">
                                {item.excerpt}
                                </p>
                                <div className="mt-5 md:flex gap-10">
                                <p className="flex md:mb-0 mb-2 md:text-base text-[12px] gap-2 text-sm text-gray-600 dark:text-gray-400 items-center">
                                    <FaMapMarkedAlt />
                                    <span>Penulis ID: {item.author_id}</span>
                                </p>
                                <p className="flex gap-2 text-sm text-gray-600 dark:text-gray-400 items-center">
                                    <FaCalendar />
                                    <span>{new Date(item.published_at).toLocaleDateString()}</span>
                                </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                    {/* PAGINATION */}
                    <div className="flex gap-1 justify-center mt-10">
                        <a
                        href="#"
                        className="text-black py-1 md:px-4 px-3 md:text-base text-sm rounded hover:text-white hover:bg-red-400 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-red-400"
                        >
                        &laquo;
                        </a>
                        <a
                        href="#"
                        className="text-white bg-red-500 py-1 md:px-4 px-3 md:text-base text-sm rounded"
                        >
                        1
                        </a>
                        <a
                        href="#"
                        className="text-black py-1 md:px-4 px-3 md:text-base text-sm rounded hover:text-white hover:bg-red-400 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-red-400"
                        >
                        2
                        </a>
                        <a
                        href="#"
                        className="text-black py-1 md:px-4 px-3 md:text-base text-sm rounded hover:text-white hover:bg-red-400 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-red-400"
                        >
                        3
                        </a>
                        <a
                        href="#"
                        className="text-black py-1 md:px-4 px-3 md:text-base text-sm rounded hover:text-white hover:bg-red-400 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-red-400"
                        >
                        4
                        </a>
                        <a
                        href="#"
                        className="text-black py-1 md:px-4 px-3 md:text-base text-sm rounded hover:text-white hover:bg-red-400 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-red-400"
                        >
                        5
                        </a>
                        <a
                        href="#"
                        className="text-black py-1 md:px-4 px-3 md:text-base text-sm rounded hover:text-white hover:bg-red-400 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-red-400"
                        >
                        6
                        </a>
                        <a
                        href="#"
                        className="text-black py-1 md:px-4 px-3 md:text-base text-sm rounded hover:text-white hover:bg-red-400 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-red-400"
                        >
                        &raquo;
                        </a>
                    </div>
                </div>


                <div className="lg:block hidden">
                    <h2 className='text-red-500 text-xl font-semibold mb-10'>REKOMENDASI</h2>
                    {/* Artikel Rekomendasi */}
                    {artikelRekomendasi.map((item) => (
                        <div key={item.id} className="mb-10">
                            <img
                            src={`http://genbi-data.test/storage/${item.thumbnail}`}
                            alt={item.title}
                            className="bg-gray-300 rounded-xl h-[200px] object-cover"
                            />
                            <Link to={`/news/read/${item.slug}`}>
                            <h3 className="font-bold mt-2 line-clamp-2 dark:text-gray-200">{item.title}</h3>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    </MainLayout>
  );
};

export default Artikel;
