// pages/Organization.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/Layouts/MainLayout';
import { useTheme } from '@/Hooks/useTheme';
import { Link } from '@inertiajs/react';




// Types
interface ScholarshipData {
  count: number;
  university: string;
}

interface University {
  name: string;
  logo: string;
  shortName: string;
}

interface PresidentProfile {
  name: string;
  role: string;
  university: string;
  quote: string;
  image: string;
  universityShort: string;
  type: 'president' | 'secretary' | 'treasure';
}

// Constants
const SCHOLARSHIP_DATA: ScholarshipData[] = [
  { count: 50, university: 'UIN SAIZU' },
  { count: 75, university: 'UNSOED' },
  { count: 50, university: 'UMP' },
];

const UNIVERSITIES: University[] = [
  {
    name: 'UIN Prof. K.H. Saifuddin Zuhri',
    shortName: 'UIN SAIZU',
    logo: './images/Logo/UIN.png'
  },
  {
    name: 'Universitas Jenderal Soedirman',
    shortName: 'UNSOED',
    logo: './images/Logo/UNSOED.png'
  },
  {
    name: 'Universitas Muhammadiyah Purwokerto',
    shortName: 'UMP',
    logo: './images/Logo/UMP.png'
  }
];



// Components
const AnimatedCount: React.FC<{ count: number; university: string }> = ({ count, university }) => {
  const [currentCount, setCurrentCount] = useState(0);
  const { isDark } = useTheme();

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 50;
    const increment = count / steps;
    const stepDuration = duration / steps;

    const interval = setInterval(() => {
      setCurrentCount((prevCount) => {
        const nextCount = prevCount + increment;
        return nextCount >= count ? count : nextCount;
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, [count]);

  return (
    <motion.div
      className={`p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center justify-center ${
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.h3
        className={`text-4xl font-bold mb-2 text-center ${
          isDark ? 'text-blue-400' : 'text-blue-600'
        }`}
      >
        {Math.round(currentCount)}
      </motion.h3>
      <p className={`text-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        {university}
      </p>
    </motion.div>
  );
};

const UniversityCard: React.FC<{ university: University; index: number }> = ({ university, index }) => {
  const { isDark } = useTheme();

  return (
    <motion.div
      className={`p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ${
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="h-32 flex items-center justify-center mb-4">
        {/* Next.js Image optimization */}
        <img
          src={university.logo}
          alt={university.name}
          className="max-h-full max-w-[180px] object-contain"
        />
      </div>
      <h3 className={`text-center font-semibold mb-2 ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>
        {university.shortName}
      </h3>
      <p className={`text-center text-sm ${
        isDark ? 'text-gray-300' : 'text-gray-600'
      }`}>
        {university.name}
      </p>
    </motion.div>
  );
};

const ProfileCard: React.FC<{ profile, index: number }> = ({ profile, index }) => {
  const { isDark } = useTheme();

  if (profile.type === "president") {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="relative group"
        >
            <div className={`rounded-xl overflow-hidden shadow-lg border h-full ${
            isDark
                ? 'bg-gray-800/70 backdrop-blur-sm border-gray-700/50'
                : 'bg-white/70 backdrop-blur-sm border-blue-100/50'
            }`}>

            <div className="relative h-[460px] overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <img
                src={`https://data.genbipurwokerto.com/storage/${profile.foto}`}
                alt={profile.nama_lengkap}
                className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
            </div>

            <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
                }`}>
                {profile.nama_lengkap}
                </h3>
                <p className={`text-sm mb-4 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                {profile.jabatan}
                <br />
                {profile.university}
                </p>
                <div className={`h-px my-4 ${
                isDark ? 'bg-gray-700' : 'bg-gray-200'
                }`} />
                <p className={`italic text-sm ${
                isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                {profile.quote}
                </p>
            </div>
            </div>
        </motion.div>
    )
  }
  return (
    <Link href={`/organisasi/struktur/${profile.periode}/${profile.jabatan}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        className="relative group"
      >
        <div className={`rounded-xl overflow-hidden shadow-lg border h-full ${
          isDark
            ? 'bg-gray-800/70 backdrop-blur-sm border-gray-700/50'
            : 'bg-white/70 backdrop-blur-sm border-blue-100/50'
        }`}>

          <div className="relative h-[460px] overflow-hidden group-hover:scale-105 transition-transform duration-500">
            <img
              src={`https://data.genbipurwokerto.com/storage/${profile.foto}`}
              alt={profile.nama_lengkap}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          </div>

          <div className="p-6">
            <h3 className={`text-xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {profile.nama_lengkap}
            </h3>
            <p className={`text-sm mb-4 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {profile.jabatan}
              <br />
              {profile.university}
            </p>
            <div className={`h-px my-4 ${
              isDark ? 'bg-gray-700' : 'bg-gray-200'
            }`} />
            <p className={`italic text-sm ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {profile.quote}
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

// Main Component
const Organization: React.FC = () => {
    const { isDark } = useTheme();
    const [struktur, setStruktur] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const fetchStruktur = async () => {
            try {
                const response = await fetch("https://data.genbipurwokerto.com/api/struktur");
                const result = await response.json();
                if (result.success) {
                setStruktur(result.data);
                } else {
                console.error("Failed to fetch struktur:", result.message);
                }
            } catch (error) {
                setError(error)
                console.error("Error fetching struktur:", error);
            }finally{
                setLoading(false)
            }
        };
        fetchStruktur();
    }, []);

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
    <MainLayout title="Organisasi">
      <div className={isDark ? 'bg-gray-900 min-h-screen' : 'bg-gray-50 min-h-screen'}>
        <div className="container mx-auto px-4 pb-16 pt-16 lg:pt-32">
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.h1
              className={`text-4xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              GenBI Purwokerto
            </motion.h1>
            <motion.h2
              className={`text-xl ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Di Bawah Naungan KPW BI Purwokerto
            </motion.h2>
          </div>

          {/* BI Logo */}
          <motion.div
            className="flex justify-center mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/39/BI_Logo.png"
              alt="Bank Indonesia"
              className="max-w-[250px]"
            />
          </motion.div>

          {/* Universities Section */}
          <div className="mb-16">
            <motion.h2
              className={`text-2xl font-bold text-center mb-8 ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Universitas Anggota
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {UNIVERSITIES.map((uni, index) => (
                <UniversityCard key={uni.shortName} university={uni} index={index} />
              ))}
            </div>
          </div>

          {/* Scholarship Statistics */}
          <div className="mb-16">
            <motion.h2
              className={`text-2xl font-bold text-center mb-8 ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Jumlah Mahasiswa Penerima Beasiswa
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {SCHOLARSHIP_DATA.map((item, index) => (
                <AnimatedCount
                  key={item.university}
                  count={item.count}
                  university={item.university}
                />
              ))}
            </div>
          </div>

          {/* Profile Messages Section */}
          <section className="py-20 relative">
            <div className={`absolute inset-0 ${
              isDark
                ? 'bg-gradient-to-b from-transparent via-gray-800/30 to-transparent'
                : 'bg-gradient-to-b from-transparent via-blue-50/30 to-transparent'
            }`} />

            <div className="container mx-auto relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className={`text-4xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  PESAN GENBI
                </h2>
                <div className="w-24 h-1 bg-blue-500 mx-auto mt-4" />
             </motion.div>

              {/* Presidents Section */}
              <div className="mb-16">
                <motion.h3
                  className={`text-2xl font-semibold text-center my-8 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Presiden Komisariat
                </motion.h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {struktur
                    .filter(profile => profile.type === 'president')
                    .map((profile, index) => (
                      <ProfileCard
                        key={profile.id}
                        profile={profile}
                        index={index}
                      />
                    ))}
                </div>
              </div>

              {/* Secretaries Section */}
              <div>
                <motion.h3
                  className={`text-2xl font-semibold text-center my-8 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Sekretaris Umum
                </motion.h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {struktur
                    .filter(profile => profile.type === 'secretary')
                    .map((profile, index) => (
                      <ProfileCard
                        key={profile.id}
                        profile={profile}
                        index={index}
                      />
                    ))}
                </div>
              </div>

              {/* Treasurer Section */}
              <div>
                <motion.h3
                  className={`text-2xl font-semibold text-center my-8 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Bendahara Umum
                </motion.h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {struktur
                    .filter(profile => profile.type === 'treasure')
                    .map((profile, index) => (
                      <ProfileCard
                        key={profile.id}
                        profile={profile}
                        index={index}
                      />
                    ))}
                </div>
              </div>

              {/* Treasurer Section */}
              <div>
                <motion.h3
                  className={`text-2xl font-semibold text-center my-8 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Deputi
                </motion.h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {struktur
                    .filter(profile => profile.type === 'deputy')
                    .map((profile, index) => (
                      <ProfileCard
                        key={profile.id}
                        profile={profile}
                        index={index}
                      />
                    ))}
                </div>
              </div>

            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
};

export default Organization;
