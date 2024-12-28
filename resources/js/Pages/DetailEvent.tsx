import MainLayout from '@/Layouts/MainLayout';
import React, { useState, useEffect } from 'react';
import { FaCalendar, FaMapMarkedAlt } from 'react-icons/fa';
import { changeDate } from '@/Utils/changeDate';
import { Link } from '@inertiajs/react';
import {
  IconCalendar,
  IconLocation,
  IconTicket,
} from "@irsyadadl/paranoid";

interface DetailEventProps {
  slug: string;
}


//@ts-ignore
const DetailEvent = React.FC<DetailEventProps> = ({slug}) => {
    const [event, setEvent] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const EventContent = ({ content }) => {
        return (
            <div
            dangerouslySetInnerHTML={{ __html: content }}
            style={{ lineHeight: "1.6", fontSize: "16px" }}
            className="content-artikel"
            />
        );
    };

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://genbi-data.test/api/event/${slug}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
            setEvent(result.data)
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
    <MainLayout title="Detail Event">
        {event && (
            <div className="container mx-auto pb-20 leading-normal tracking-normal">
                <div className="grid lg:grid-cols-5 pt-20 pb-10 md:px-20 px-5 mb-8 items-center bg-gray-100 dark:bg-gray-950 relative md:gap-6">
                    <span className="h-full lg:w-[700px] w-full absolute right-0 lg:bg-gradient-to-l bg-gradient-to-b from-blue-700/30 to-blue-700/0"></span>

                    <div className="lg:col-span-3 order-2 lg:order-1 relative z-10">
                        <h1 className="lg:leading-[2.7rem] font-bold md:text-3xl lg:text-left text-center mb-2 text-xl text-gray-900 dark:text-gray-200">
                            {//@ts-ignore
                            event.nama}
                        </h1>

                        <div className="md:flex gap-10 md:mb-8 mb-4">
                            <p className="flex md:mb-0 mb-2 md:text-base text-[12px] gap-2 text-sm text-gray-600 dark:text-gray-400 items-center">
                                <FaMapMarkedAlt />
                                <span>{
                                //@ts-ignore
                                event.tempat}</span>
                            </p>
                            <p className="flex gap-2 text-sm text-gray-600 dark:text-gray-400 items-center">
                                <FaCalendar />
                                <span>{changeDate(new Date(
                                    //@ts-ignore
                                    event.tanggal))}</span>
                            </p>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap lg:text-base md:text-sm text-[15px]">{
                        //@ts-ignore
                        event.excerpt}</p>
                    </div>
                    <div className="md:py-8 py-0 pt-8 pb-3 lg:col-span-2 relative z-10 lg:order-2 order-1">
                        <img
                            src={
                                //@ts-ignore
                                event.gambar ? `https://data.genbipurwokerto.com/storage/${event.gambar}` : "../images/NO IMAGE AVAILABLE.jpg"}
                            className="w-full h-[200px] md:h-[350px] rounded object-cover"
                            alt={//@ts-ignore
                            event.nama}
                        />
                    </div>
                </div>

                <div className="container sm:px-6 px-2 md:justify-center flex-wrap lg:flex-nowrap mx-auto mt-10 flex relative justify-between min-h-screen">

                    <div className="w-full lg:w-2/3 bg-white dark:bg-gray-800 dark:border-gray-950 lg:mr-10 shadow-lg rounded-lg border-2">
                        <h2 className="md:text-2xl text-xl font-semibold md:px-8 px-3 py-3 md:py-4 text-red-500 border-b-2">Detail Event</h2>
                        <div className="flex justify-center">
                            <iframe
                            src={
                                //@ts-ignore
                                event.link_gmap}
                            //@ts-ignore
                            allowfullscreen=""
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"
                            className="bg-gray-300 w-[95%] sm:w-[95%] h-[250px] mt-5 rounded-md sm:h-[400px]"
                            ></iframe>
                        </div>

                        <div className="sm:text-base dark:text-white text-sm deskripsiFull leading-6 sm:leading-7 font-normal md:p-8 p-3 whitespace-pre-wrap ">
                            <EventContent content={
                                //@ts-ignore
                                event.deskripsi} />
                        </div>
                    </div>

                    <div className="w-full lg:w-[30%] space-y-6 sticky top-28">
                        <div className="bg-white dark:bg-gray-800 dark:border-gray-950 shadow-lg rounded-lg border-2">
                            <h2 className="md:text-2xl text-xl font-semibold md:px-8 px-3 py-3 md:py-4 text-red-500 border-b-2">Tentang Event</h2>
                            <ul className="mb-4 sm:px-6 px-3 py-4">
                                <li className='flex leading-8 dark:text-white sm:mt-4 justify-between font-semibold'><span>Tempat</span>{
                                //@ts-ignore
                                event.tempat}</li>
                                <li className='flex leading-8 dark:text-white sm:mt-4 justify-between font-semibold'><span>Waktu</span>{
                                //@ts-ignore
                                changeDate(new Date(event.tanggal))}</li>
                                <li className='flex leading-8 dark:text-white sm:mt-4 justify-between font-semibold'><span>Jumlah Pemateri</span>{
                                //@ts-ignore
                                event.pemateri.length}</li>
                            </ul>

                        </div>

                        <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded">RSVP</button>
                    </div>

                </div>


                <div className="container mx-auto mt-10 pb-10 px-6">
                    <h3 className="text-xl sm:text-2xl font-semibold sm:mb-4">Rekomendasi Event</h3>
                    <a href="/detail-event" className="grid lg:grid-cols-5 gap-10 items-center mt-10">
                        <div className="h-[350px] w-full rounded-md overflow-hidden lg:col-span-2">
                            <img
                            src="/images/events/FGS.jpeg"
                            alt=""
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
                            <h5 className="text-red-500 font-semibold md:mb-5 mb-3 md:text-base text-sm">
                            RAGAM EVENT
                            </h5>
                            <span>
                            <h2 className="font-bold md:text-3xl text-gray-800 text-xl dark:text-white">
                                {"FESTIVAL GUNUNG SLAMET"}
                            </h2>
                            </span>
                            <p className="text-gray-800 mt-5 md:text-base text-[12px] dark:text-white">
                            Acara ini akan menjadi salah satu festival budaya terbesar di Jawa Tengah, menghadirkan berbagai kegiatan seperti pentas seni, pameran kerajinan lokal, dan kuliner tradisional. Setiap pengunjung akan mendapatkan pengalaman unik dan mendalam tentang kebudayaan masyarakat sekitar Gunung Slamet. Ayo, jangan lewatkan kesempatan ini untuk merasakan kekayaan budaya Nusantara dan menjadi bagian dari sejarah!
                            </p>
                            <div className="flex gap-5 mt-10 text-gray-600 md:text-base text-sm dark:text-slate-200">
                            <span className="flex gap-2 items-center">
                                <IconTicket />
                                <small>Rp 5.000</small>
                            </span>
                            <span className="flex gap-2 items-center">
                                <IconCalendar />
                                <small>12-14 Juli Des 2024</small>
                            </span>
                            <span className="flex gap-2 items-center">
                                <IconLocation />
                                <small>Purbalingga</small>
                            </span>
                            </div>
                        </div>
                    </a>

                    <a href="/detail-event" className="grid lg:grid-cols-5 gap-10 items-center mt-10 ">
                        <div className="h-[350px] w-full rounded-md overflow-hidden lg:col-span-2">
                            <img
                            src="/images/events/KKS.jpg"
                            alt=""
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
                            <h5 className="text-red-500 font-semibold md:mb-5 mb-3 md:text-base text-sm">
                            RAGAM EVENT
                            </h5>
                            <span>
                            <h2 className="font-bold md:text-3xl text-gray-800 text-xl dark:text-white">
                                {"KARYA KREATIVE SERAYU 2024"}
                            </h2>
                            </span>
                            <p className="text-gray-800 mt-5 md:text-base text-[12px] dark:text-white">
                            Karya Kreative Serayu 2024 akan menampilkan berbagai hasil karya kreatif dari seniman lokal dan nasional. Acara ini bertujuan untuk memperkenalkan seni dan budaya yang berkembang di sekitar wilayah Serayu, memberikan wadah bagi generasi muda untuk mengekspresikan kreativitas mereka. Jadilah bagian dari perayaan seni dan budaya ini, dengan berbagai kegiatan menarik seperti pameran seni, workshop, dan pertunjukan musik yang akan memanjakan para pengunjung.
                            </p>
                            <div className="flex gap-5 mt-10 text-gray-600 md:text-base text-sm dark:text-slate-200">
                            <span className="flex gap-2 items-center">
                                <IconTicket />
                                <small>Gratis</small>
                            </span>
                            <span className="flex gap-2 items-center">
                                <IconCalendar />
                                <small>20-21 Juli 2024</small>
                            </span>
                            <span className="flex gap-2 items-center">
                                <IconLocation />
                                <small>Kompleks Menara Pandang Teratai Purwokerto</small>
                            </span>
                            </div>
                        </div>
                    </a>


                </div>
            </div>
        )}
    </MainLayout>
  );
};



export default DetailEvent;
