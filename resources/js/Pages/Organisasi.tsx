// pages/Organization.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/Layouts/MainLayout';
import { useTheme } from '@/Hooks/useTheme';

const AnimatedCount = ({ count, university }) => {
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

const Organization = () => {
  const { isDark } = useTheme();
  
  const scholarshipData = [
    { count: 50, university: 'UIN SAIZU' },
    { count: 75, university: 'UNSOED' },
    { count: 50, university: 'UMP' },
  ];

  const universities = [
    { name: 'UIN SAIZU', logo: 'https://uinsaizu.ac.id/images/LOGO-UIN.png' },
    { name: 'Universitas Jenderal Soedirman', logo: 'https://perpus.unsoed.ac.id/wp-content/uploads/2024/03/Universitas-Jendral-Soedirman-Logo.png' },
    { name: 'Universitas Muhammadiyah Purwokerto', logo: '../images/logo-ump.png'}
  ];

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
              {universities.map((uni, index) => (
                <motion.div
                  key={index}
                  className={`p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ${
                    isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <div className="h-32 flex items-center justify-center mb-4">
                    <img 
                      src={uni.logo} 
                      alt={uni.name} 
                      className="max-h-full max-w-[180px] object-contain" 
                    />
                  </div>
                  <p className={`text-center text-sm ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>{uni.name}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Scholarship Statistics */}
          <div>
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
              {scholarshipData.map((item, index) => (
                <AnimatedCount
                  key={index}
                  count={item.count}
                  university={item.university}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Organization;
