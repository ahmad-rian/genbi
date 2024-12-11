// pages/Organization.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/Layouts/MainLayout';
import { useTheme } from '@/Hooks/useTheme';
import { Link } from '@inertiajs/react';


const fadeInUpAnimation = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true }
};

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
                src={`http://genbi-data.test/storage/${profile.foto}`}
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
              src={`http://genbi-data.test/storage/${profile.foto}`}
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

    useEffect(() => {
        const fetchStruktur = async () => {
            try {
                const response = await fetch("http://genbi-data.test/api/struktur");
                const result = await response.json();
                if (result.success) {
                setStruktur(result.data);
                } else {
                console.error("Failed to fetch struktur:", result.message);
                }
            } catch (error) {
                console.error("Error fetching struktur:", error);
            }
        };
        fetchStruktur();
    }, []);

    const styles = {
        gradient: isDark
            ? 'bg-gradient-to-b from-transparent via-gray-800/30 to-transparent'
            : 'bg-gradient-to-b from-transparent via-blue-50/30 to-transparent',
        text: isDark ? 'text-white' : 'text-gray-900',
        container: isDark
            ? 'bg-gray-800/70 backdrop-blur-sm'
            : 'bg-white/70 backdrop-blur-sm',
        button: isDark
            ? 'bg-blue-600 text-white hover:bg-blue-500'
            : 'bg-blue-600 text-white hover:bg-blue-700'
    };

  return (
    <MainLayout title="Organisasi">
      <div className={isDark ? 'bg-gray-900 min-h-screen' : 'bg-gray-50 min-h-screen'}>
        <div className="container mx-auto lg:py-0 py-8 px-4 relative min-h-screen lg:pt-28 lg:pb-20">
            <div className="mx-auto relative z-10">
                <motion.div {...fadeInUpAnimation} className="text-center mb-8">
                    <h1 className={`text-2xl sm:text-3xl font-bold ${styles.text}`}>Kepengurusan GenBI 2024-2025</h1>
                    <div className="w-16 h-1 bg-blue-500 mx-auto mt-3" />
                </motion.div>
            </div>

          {/* Profile Messages Section */}
          <section className="pb-20 pt-3 relative">
            <div className={`absolute inset-0 ${
              isDark
                ? 'bg-gradient-to-b from-transparent via-gray-800/30 to-transparent'
                : 'bg-gradient-to-b from-transparent via-blue-50/30 to-transparent'
            }`} />

            <div className="container mx-auto relative z-10">
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
