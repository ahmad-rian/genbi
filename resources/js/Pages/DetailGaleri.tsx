import React, { useEffect, useState } from "react";
import { FaCalendar, FaMapMarkedAlt, FaUser } from "react-icons/fa";

import MainLayout from '@/Layouts/MainLayout';
import NotFound from "@/Components/NotFound";
import { estimateReadingTime } from "@/Utils/estimateReadingTime";
import { changeDate } from './../Utils/changeDate';
import { Link } from "@inertiajs/react";
import Lightbox from "yet-another-react-lightbox";



interface DetailGaleriProps {
  slug: string;
}

const DetailGaleri = React.FC<DetailGaleriProps> = ({slug}) => {
    const [artikel, setArtikel] = useState([]);
    const [artikelRandom, setArtikelRandom] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openGaleri, setOpenGaleri] = useState(false);
    const [lightboxGaleri, setLightboxGaleri] = useState([]);

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://genbi-data.test/api/galeri/${slug}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
            const galeriImage = result.data.image_galeri
            .map((item) => ({ src: `http://genbi-data.test/storage/${item.nama}` }));

            // Simpan ke state
            setLightboxGaleri(galeriImage)
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
    }, []);

    if (loading) return(
        <div className='flex justify-center items-center flex-col fixed z-[999] right-[50%] top-[50%] translate-x-[50%] -translate-y-[50%] w-screen h-screen bg-white gap-3'>
            <img
                src='../images/logo.png'
                className="lg:w-1/4 w-[80%] h-[40%]"
                alt='icon-splash'
            />
            <div className="flex items-center justify-center">
                <img src="../images/Loader.svg" alt="loader image" className='w-10 mr-5' />
                <p>Sedang Memuat Data</p>
            </div>
        </div>
    );

    if (error) return <p>Error: {error}</p>;

  return (
    <MainLayout title={artikel.title ? artikel.title : "Detail Artikel"}>
        <span
            className="w-[1000px] z-60 h-[1000px] rounded-full absolute -left-[500px] -top-[500px] -rotate-[60deg]"
            style={{
            backgroundImage:
                "radial-gradient(169.40% 89.55% at 94.76% 6.29%, rgba(29,79,217, 0.70) 0%, rgba(239, 68, 68, 0.0) 100%)",
            }}
        ></span>
        <main className="container mx-auto pb-20">

            <div className="grid lg:grid-cols-5 pt-20 pb-10 md:px-20 px-5 mb-8 items-center bg-gray-100 dark:bg-gray-950 relative gap-6">
                <div className="lg:col-span-3 order-2 lg:order-1 relative z-10 lg:text-left text-center">
                    <h1 className="lg:leading-[2.7rem] font-bold md:text-3xl text-xl mb-8 text-gray-900 dark:text-gray-200 h-auto">
                        {/* {artikel.title} */}
                        asdlknasd
                    </h1>
                    <p className="text-gray-700 dark:text-gray-300 lg:text-base md:text-sm text-[12px] line-clamp-3">{artikel.deskripsi}</p>

                    <div className="mt-5 md:flex gap-10">
                        <p className="flex md:mb-0 mb-2 md:text-base text-[12px] gap-2 text-sm text-gray-600 dark:text-gray-400 items-center">
                            <FaMapMarkedAlt />
                            <span>Tempat : {artikel.tempat}</span>
                        </p>
                        <p className="flex gap-2 text-sm text-gray-600 dark:text-gray-400 items-center">
                            <FaCalendar />
                            <span>{changeDate(new Date(artikel.waktu))}</span>
                        </p>
                    </div>
                </div>
                <div className="py-8 lg:col-span-2 relative z-10 lg:order-2 order-1">
                    <img
                        src={artikel.thumbnail ? `http://genbi-data.test/storage/${artikel.thumbnail}` : "../images/NO IMAGE AVAILABLE.jpg"}
                        className="w-full h-[350px] rounded object-cover"
                        alt="asdlknasd"
                    />
                </div>
            </div>

            <main className="grid lg:grid-cols-3 md:px-20 px-5 gap-10 mt-20 mb-20">
                {artikel.image_galeri.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => setOpenGaleri(true)}
                        className="cursor-pointer w-full h-[300px] rounded"
                    >
                        <img
                            src={item.nama ? `http://genbi-data.test/storage/${item.nama}` : "../images/NO IMAGE AVAILABLE.jpg"}
                            className="w-full h-full object-cover"
                            alt={`Galeri ke ${index}`}
                        />
                    </div>
                ))}

                <Lightbox
                    open={openGaleri}
                    close={() => setOpenGaleri(false)}
                    slides={lightboxGaleri}
                />
            </main>

        </main>
    </MainLayout>
  );
};



export default DetailGaleri;
