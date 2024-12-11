import React, { useEffect, useState } from "react";
import MainLayout from '@/Layouts/MainLayout';
import NotFound from "@/Components/NotFound";

interface DetailStrukturProps {
  periode: string;
  namaBidang: string;
}

const DetailStruktur = React.FC<DetailStrukturProps> = ({periode, namaBidang}) => {
    const [struktur, setStruktur] = useState(null);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://genbi-data.test/api/struktur/${periode}/${namaBidang}`
        );
        const result = await response.json();

        if (result.success) {
          setStruktur(result.data.struktur);
          setMembers(result.data.member);
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

    fetchData();
  }, []);


  if (loading) return <p>Loading...</p>;

  if (error) return <NotFound/>;

  // Manipulasi format jabatan
  const bidang = struktur.jabatan.split(" ")[1]; // Mengambil kata setelah "Deputi"
  const formattedBidang = `Bidang ${bidang} ${periode}`;

  // Grouping members by department
  const groupedMembers = members.reduce((acc, member) => {
    if (!acc[member.departemen]) {
      acc[member.departemen] = [];
    }
    acc[member.departemen].push(member);
    return acc;
  }, {});

  return (
    <MainLayout title={`Detail Struktur ${namaBidang} Periode ${periode}`}>
        <main className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <section className="py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-10 min-h-screen items-start">
                    {/* Bagian Kiri: Detail Struktur */}
                    <div className="order-1 space-y-6 sticky top-28">
                        <h1 className="text-3xl font-bold mb-8">Detail Struktur</h1>
                        <img
                        src={`http://genbi-data.test/storage/${struktur.foto}`}
                        alt={struktur.jabatan}
                        className="lg:w-full lg:h-[550px] rounded-xl bg-slate-700 bg-cover"
                        />
                    </div>

                    {/* Bagian Kanan: Informasi dan Member */}
                    <div className="order-2 relative col-span-2">
                        <div className="flex justify-center items-center">
                        <h2 className="text-3xl font-bold inline-flex items-center gap-4 text-blue-800">
                            <div className="h-1 w-12 bg-gradient-to-r from-transparent to-blue-500 rounded-full" />
                            {formattedBidang}
                            <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
                        </h2>
                        </div>
                        <h3 className="text-xl lg:text-2xl font-semibold mt-5">Deputi</h3>
                        <p className="text-lg">{struktur.nama_lengkap}</p>
                        <h3 className="text-xl lg:text-2xl font-semibold mt-5">
                        Quote
                        </h3>
                        <p className="text-lg italic">{struktur.quote}</p>

                        {/* Menampilkan Departemen dan Anggota */}
                        {Object.keys(groupedMembers).map((departemen, index) => (
                        <div key={index} className="mt-5">
                            {/* Nama Departemen Ditampilkan Sekali */}
                            <h3 className="text-xl lg:text-2xl font-semibold">{departemen}</h3>

                            {/* Menampilkan Anggota di bawah Departemen */}
                            {groupedMembers[departemen].map((member, idx) => (
                            <p key={idx} className="text-lg">{member.nama}</p>
                            ))}
                        </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    </MainLayout>
  );
};



export default DetailStruktur;
