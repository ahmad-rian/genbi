// pages/Organization.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/Layouts/MainLayout';
import { useTheme } from '@/Hooks/useTheme';

// Types
interface ScholarshipData {
  count: number;
  university: string;
}

interface University {
  name: string;
  logo: string;
}

interface PresidentProfile {
  name: string;
  role: string;
  university: string;
  quote: string;
  image: string;
  universityShort: string;
}

// Constants
const SCHOLARSHIP_DATA: ScholarshipData[] = [
  { count: 50, university: 'UIN SAIZU' },
  { count: 75, university: 'UNSOED' },
  { count: 50, university: 'UMP' },
];

const UNIVERSITIES: University[] = [
  { 
    name: 'UIN SAIZU', 
    logo: 'https://uinsaizu.ac.id/images/LOGO-UIN.png' 
  },
  { 
    name: 'Universitas Jenderal Soedirman', 
    logo: 'https://perpus.unsoed.ac.id/wp-content/uploads/2024/03/Universitas-Jendral-Soedirman-Logo.png' 
  },
  { 
    name: 'Universitas Muhammadiyah Purwokerto', 
    logo: '../images/logo-ump.png'
  }
];

const PRESIDENT_PROFILES: PresidentProfile[] = [
  {
    name: "Stevani Aprilya Pratama",
    role: "Presiden GenBI Purwokerto",
    university: "Komisariat UIN Saifuddin Zuhri",
    quote: "Adabmu, menyelamatkan hidupmu",
    image: "../images/stevani.png",
    universityShort: "UIN"
  },
  {
    name: "Mochamad Fajar Arianto",
    role: "Presiden GenBI Purwokerto",
    university: "Komisariat Univ. Jenderal Soedirman",
    quote: "\"Definisi kesepian sebenarnya adalah hidup tanpa tanggung jawab sosial.\" – Goenawan Mohamad",
    image: "../images/fajar.png",
    universityShort: "UNSOED"
  },
  {
    name: "Nia Nurmawati",
    role: "Presiden GenBI Purwokerto",
    university: "Komisariat Univ. Muhammadiyah Purwokerto",
    quote: "\"Cara terbaik untuk memprediksi masa depan adalah dengan menciptakannya.\" – Abraham Lincoln",
    image: "../images/nia.png",
    universityShort: "UMP"
  }
];

// Components
const AnimatedCount: React.FC<{ count: number; university: string }> = ({ count, university }) => {
  const [currentCount, setCurrentCount] = useState(0);
  const { isDark } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCount((prevCount) => {
        if (prevCount >= count) {
          clearInterval(interval);
          return count;
        }
        return prevCount + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [count]);

  return (
    <motion.div
      className={`p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center justify-center ${
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h3
        className={`text-4xl font-bold mb-2 text-center ${
          isDark ? 'text-blue-400' : 'text-blue-600'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {currentCount}
      </motion.h3>
      <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
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
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
    >
      <div className="h-32 flex items-center justify-center mb-4">
        <img 
          src={university.logo} 
          alt={university.name} 
          className="max-h-full max-w-[180px] object-contain" 
        />
      </div>
      <p className={`text-center text-sm ${
        isDark ? 'text-gray-300' : 'text-gray-600'
      }`}>
        {university.name}
      </p>
    </motion.div>
  );
};

const PresidentCard: React.FC<{ profile: PresidentProfile; index: number }> = ({ profile, index }) => {
  const { isDark } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="relative group"
    >
      <div className={`rounded-xl overflow-hidden shadow-lg border lg:h-[670px] ${
        isDark
          ? 'bg-gray-800/70 backdrop-blur-sm border-gray-700/50'
          : 'bg-white/70 backdrop-blur-sm border-blue-100/50'
      }`}>
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md">
            <p className="text-sm font-semibold">Presiden Komisariat</p>
            <p className="text-xs">{profile.universityShort}</p>
          </div>
        </div>

        <div className="relative h-[460px] overflow-hidden group-hover:scale-105 transition-transform duration-500">
          <img
            src={profile.image}
            alt={profile.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        </div>

        <div className="p-6">
          <h3 className={`text-xl font-bold mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {profile.name}
          </h3>
          <p className={`text-sm mb-4 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {profile.role}
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
  );
};

// Main Component
const Organization: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <MainLayout title="Organisasi">
      <div className={isDark ? 'bg-gray-900' : 'bg-white'}>
        <div className="container mx-auto px-4 py-16">
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.h1
              className={`text-3xl font-bold mb-2 ${
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
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Universitas
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {UNIVERSITIES.map((uni, index) => (
                <UniversityCard key={index} university={uni} index={index} />
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
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Jumlah Mahasiswa Penerima Beasiswa
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {SCHOLARSHIP_DATA.map((item, index) => (
                <AnimatedCount
                  key={index}
                  count={item.count}
                  university={item.university}
                />
              ))}
            </div>
          </div>

          {/* President Messages Section */}
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
                <h2 className={`text-4xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  PESAN GENBI
                </h2>
                <div className="w-16 h-1 bg-blue-500 mx-auto mt-4" />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {PRESIDENT_PROFILES.map((profile, index) => (
                  <PresidentCard key={index} profile={profile} index={index} />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
};

export default Organization;