import React, { useEffect, useState } from "react";
import { FaCalendar, FaUser } from "react-icons/fa";

import MainLayout from '@/Layouts/MainLayout';
import NotFound from "@/Components/NotFound";
import { estimateReadingTime } from "@/Utils/estimateReadingTime";
import { changeDate } from './../Utils/changeDate';
import { Link } from "@inertiajs/react";



interface DetailArtikelProps {
  slug: string;
}

const DetailArtikel = React.FC<DetailArtikelProps> = ({slug}) => {
    const [artikel, setArtikel] = useState([]);
    const [artikelRandom, setArtikelRandom] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingRandomArtikel, setLoadingRandomArtikel] = useState(true);
    const [error, setError] = useState(null);
    const [errorRandomArtikel, setErrorRandomArtikel] = useState(null);

    const ArticleContent = ({ content }) => {
        return (
            <div
            dangerouslySetInnerHTML={{ __html: content }}
            style={{ lineHeight: "1.6", fontSize: "16px" }}
            className="content-artikel"
            />
        );
    };

    const fetchDataRandom = async () => {
        try{
            const responseRandomArtikel = await fetch("http://genbi-data.test/api/artikel/rekomendasi-per-page")

            if (!responseRandomArtikel.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const resultRandomArtikel = await responseRandomArtikel.json();

            if (resultRandomArtikel.success) {
                setArtikelRandom(resultRandomArtikel.data)
            } else {
                setError(resultRandomArtikel.message); // Tangkap error jika ada
                console.error("Error fetching data:", resultRandomArtikel.message);
            }

        }catch (error) {
            setErrorRandomArtikel(error.message); // Tangkap error jika ada
            console.error("Fetch error:", error);
        }finally{
            setLoadingRandomArtikel(false); // Hentikan loading
        }
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://genbi-data.test/api/artikel/${slug}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
            setArtikel(result.data)
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
        fetchDataRandom()
    }, []);

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error: {eror}</p>;

  return (
    <MainLayout title={artikel.title ? artikel.title : "Detail Artikel"}>
        <main className="container mx-auto pb-20">
            <div className="grid lg:grid-cols-5 pt-20 pb-10 md:px-20 px-5 mb-8 items-center bg-gray-100 dark:bg-gray-950 relative">
                <span className="h-full lg:w-[700px] w-full absolute right-0 lg:bg-gradient-to-l bg-gradient-to-b from-blue-700/30 to-blue-700/0"></span>
                <div className="lg:col-span-3 order-2 lg:order-1 relative z-10 lg:text-left text-center">
                    <p className="font-semibold mb-2 text-blue-700 md:md:text-base text-[13px] text-sm">
                        {artikel.kategori_artikel.nama}
                    </p>
                    <h1 className="lg:leading-[2.7rem] font-bold md:text-3xl text-xl mb-8 text-gray-900 dark:text-gray-200 h-auto">
                        {artikel.title}
                    </h1>
                    <p className="mr-3 md:text-sm text-[12px] text-gray-800 dark:text-gray-300">
                        Ditulis oleh{" "}
                        <span className="text-blue-700 font-semibold">{artikel.user.name}</span> |{" "}
                        <span className="text-gray-500 dark:text-gray-400 italic">
                        Diperbaharui pada {changeDate(new Date(artikel.updated_at))}
                        </span>
                    </p>
                    <p className="mr-3 text-sm text-gray-800 dark:text-gray-300">
                        Diterbitkan pada {changeDate(new Date(artikel.published_at))} | {estimateReadingTime(artikel.content)} Menit Baca
                    </p>
                </div>
                <div className="py-8 lg:col-span-2 relative z-10 lg:order-2 order-1">
                <img
                    src={artikel.thumbnail ? `http://genbi-data.test/storage/${artikel.thumbnail}` : "../images/NO IMAGE AVAILABLE.jpg"}
                    className="w-full h-[350px] rounded object-cover"
                    alt={artikel.title}
                />
                </div>
            </div>

            <main className="grid lg:grid-cols-3 md:px-20 px-5 gap-20 mt-20 mb-20">
                <div className="lg:col-span-2 text-gray-800 dark:text-gray-200">

                <ArticleContent content={artikel.content} />

                </div>
                <div>
                <div className="bg-gray-50 dark:bg-gray-950 p-10 rounded">
                    <img
                    src={artikel.user.foto ? `http://genbi-data.test/storage/${artikel.user.foto}` : "../images/NO IMAGE AVAILABLE.jpg"}
                    className="w-[70px] rounded"
                    alt="avatar"
                    />
                    <h1 className="font-bold mt-4 text-gray-800 dark:text-gray-300">
                    {artikel.user.name}
                    </h1>
                    <p className="text-sm mt-2 text-gray-700 dark:text-gray-400">
                        {artikel.user.deskripsi}
                    </p>

                </div>
                </div>
            </main>

            <hr className="w-[90%] mx-auto dark:border-gray-900" />

            <section className="lg:grid hidden grid-cols-3 gap-10 px-20 mt-10">
                <div className="col-span-3">
                <h3 className="text-2xl inline-block font-semibold transition-all hover:pr-3 border-b-4 border-blue-700 dark:text-gray-200">
                    BERITA LAINNYA
                </h3>
                </div>

                {artikelRandom.map((item, index) => (
                    <Link href={`/artikel/${item.slug}`} key={index}>
                        <img
                            src={item.thumbnail ? `http://genbi-data.test/storage/${item.thumbnail}` : "../images/NO IMAGE AVAILABLE.jpg"}
                            alt={item.title}
                            className="h-[250px] object-cover w-full rounded"
                        />
                        <h3 className="mt-3 text-xl font-bold dark:text-gray-200">
                            {item.title}
                        </h3>
                        <div className="my-5 flex gap-5">
                            <span className="flex gap-2 items-center text-gray-600 dark:text-gray-400">
                            <FaUser />
                            <small>{item.user.name}</small>
                            </span>
                            <span className="flex gap-2 items-center text-gray-600 dark:text-gray-400">
                            <FaCalendar />
                            <small>{changeDate(new Date(item.published_at))}</small>
                            </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mt-2 text-sm">
                            {item.excerpt}
                        </p>
                    </Link>
                ))}

            </section>
        </main>
    </MainLayout>
  );
};



export default DetailArtikel;
