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

const PRESIDENT_PROFILES: PresidentProfile[] = [
  {
    name: "Stevani Aprilya Pratama",
    role: "Presiden GenBI Purwokerto",
    university: "Komisariat UIN Prof. K.H. Saifuddin Zuhri",
    quote: "Semua yang ada didepan itu bukan suatu kebetulan, beradablah dan terus bersungguh-sungguh dalam memulai sesuatu",
    image: "/images/stevani.png",
    universityShort: "UIN",
    type: "president"
  },
  {
    name: "Mochamad Fajar Arianto",
    role: "Presiden GenBI Purwokerto",
    university: "Komisariat Univ. Jenderal Soedirman",
    quote: "Percayalah bahwa walau hanya dengan sedikit langkah akan banyak memberi perubahan ke arah lebih cerah",
    image: "/images/fajar.png",
    universityShort: "UNSOED",
    type: "president"
  },
  {
    name: "Nia Nurmawati",
    role: "Presiden GenBI Purwokerto",
    university: "Komisariat Univ. Muhammadiyah Purwokerto",
    quote: "\"Tidak semua menjadi komandan, tentu harus ada prajuritnya, bukan besar kecil tugas yang menjadikan tinggi rendahnya nilai dirimu, jadilah dirimu sebaik-baik dirimu sendiri\" – SHK",
    image: "/images/nia.png",
    universityShort: "UMP",
    type: "president"
  },
  {
    name: "Asih Saferia Meilani",
    role: "Sekretaris Umum",
    university: "Komisariat UIN Prof. K.H. Saifuddin Zuhri",
    quote: "Jadilah pribadi yang bermanfaat dan teruslah berbuat kebaikan",
    image: "/images/sekum-uin-1.png",
    universityShort: "UIN",
    type: "secretary"
  },

  {
    name: "Putri Amaliyah",
    role: "Sekretaris Umum",
    university: "Komisariat Univ. Muhammadiyah Purwokerto",
    quote: "---",
    image: "/images/sekum-ump.png",
    universityShort: "UMP",
    type: "secretary"
  },
  {
    name: "Vitriyah Arafah Surachman",
    role: "Sekretaris Umum",
    university: "Komisariat Univ. Muhammadiyah Purwokerto",
    quote: "\"Man Jadda Wa Jada\", Barangsiapa yang bersungguh-sungguh pasti akan berhasil",
    image: "/images/sekum-ump-2.png",
    universityShort: "UMP",
    type: "secretary"
  },
  {
    name: "Maya Amalia Kurniati",
    role: "Sekretaris Umum",
    university: "Komisariat Univ. Jenderal Soedirman",
    quote: "Teruslah melangkah sampai semua harapan menjadi nyata",
    image: "/images/sekum-unsoed-1.png",
    universityShort: "UIN",
    type: "secretary"
  },
  {
    name: "Dewi Fatimah",
    role: "Bendahara Umum",
    university: "Komisariat UIN Prof. K.H. Saifuddin Zuhri",
    quote: "لَا تَحْتَقِرْ مَنْ دُوْنَكَ فَلِكُلِّ شَىءٍ مَزِيَّةٌ Janganlah menghina orang yang lebih rendah darimu, karena setiap sesuatu memiliki kelebihan.",
    image: "/images/bendum-uin-1.png",
    universityShort: "UIN",
    type: "treasure"
  },
  {
    name: "Fiqih Ega Pratama",
    role: "Sekretaris Umum",
    university: "Komisariat Univ. Jenderal Soedirman",
    quote: "\"Stand tall, stand proud, and stand alone if you must. Independence starts from within.\"",
    image: "/images/sekum-unsoed-2.png",
    universityShort: "UMP",
    type: "treasure"
  },
  {
    name: "Fiqih Ega Pratama",
    role: "Sekretaris Umum",
    university: "Komisariat Univ. Jenderal Soedirman",
    quote: "\"Stand tall, stand proud, and stand alone if you must. Independence starts from within.\"",
    image: "/images/sekum-unsoed-2.png",
    universityShort: "UMP",
    type: "treasure"
  },
  {
    name: "Fiqih Ega Pratama",
    role: "Sekretaris Umum",
    university: "Komisariat Univ. Jenderal Soedirman",
    quote: "\"Stand tall, stand proud, and stand alone if you must. Independence starts from within.\"",
    image: "/images/sekum-unsoed-2.png",
    universityShort: "UMP",
    type: "treasure"
  },
  {
    name: "Fiqih Ega Pratama",
    role: "Sekretaris Umum",
    university: "Komisariat Univ. Jenderal Soedirman",
    quote: "\"Stand tall, stand proud, and stand alone if you must. Independence starts from within.\"",
    image: "/images/sekum-unsoed-2.png",
    universityShort: "UMP",
    type: "treasure"
  },
  {
    name: "Fiqih Ega Pratama",
    role: "Sekretaris Umum",
    university: "Komisariat Univ. Jenderal Soedirman",
    quote: "\"Stand tall, stand proud, and stand alone if you must. Independence starts from within.\"",
    image: "/images/sekum-unsoed-2.png",
    universityShort: "UMP",
    type: "treasure"
  },
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

const ProfileCard: React.FC<{ profile: PresidentProfile; index: number }> = ({ profile, index }) => {
  const { isDark } = useTheme();

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
        <div className="absolute top-4 left-4 z-10">
          <div className={`px-4 py-2 rounded-lg shadow-md ${
            profile.type === 'president'
              ? 'bg-blue-600 text-white'
              : 'bg-blue-600 text-white'
          }`}>
            <p className="text-sm font-semibold">
              {profile.type === 'president' ? 'Presiden Komisariat' : 'Sekretaris Umum'}
            </p>
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
                  className={`text-2xl font-semibold text-center mb-8 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Presiden Komisariat
                </motion.h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {PRESIDENT_PROFILES
                    .filter(profile => profile.type === 'president')
                    .map((profile, index) => (
                      <ProfileCard
                        key={`${profile.universityShort}-president`}
                        profile={profile}
                        index={index}
                      />
                    ))}
                </div>
              </div>

              {/* Secretaries Section */}
              <div>
                <motion.h3
                  className={`text-2xl font-semibold text-center mb-8 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Sekretaris Umum
                </motion.h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {PRESIDENT_PROFILES
                    .filter(profile => profile.type === 'secretary')
                    .map((profile, index) => (
                      <ProfileCard
                        key={`${profile.universityShort}-secretary`}
                        profile={profile}
                        index={index}
                      />
                    ))}
                </div>
              </div>

              {/* Treasurer Section */}
              <div>
                <motion.h3
                  className={`text-2xl font-semibold text-center mb-8 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Bendahara Umum
                </motion.h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {PRESIDENT_PROFILES
                    .filter(profile => profile.type === 'treasure')
                    .map((profile, index) => (
                      <ProfileCard
                        key={`${profile.universityShort}-treasure`}
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
