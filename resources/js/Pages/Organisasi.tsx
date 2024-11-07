import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/Components/Navbar';
import { Head } from '@inertiajs/react';
import Footer from '@/Components/Footer';

const AnimatedCount = ({ count, university }) => {
  const [currentCount, setCurrentCount] = useState(0);

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
      className="bg-white p-8 rounded-lg shadow-lg text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h3
        className="text-4xl font-bold mb-2 text-blue-600"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {currentCount}
      </motion.h3>
      <p className="text-gray-700">{university}</p>
    </motion.div>
  );
};

const Organization: React.FC = () => {
  const scholarshipData = [
    { count: 50, university: 'UIN SAIZU' },
    { count: 75, university: 'UNSOED' },
    { count: 50, university: 'UMP' },
  ];

  return (
    <>
    <Head title="Organisasi" />
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-20">
        <div className="container mx-auto px-4">
          <motion.h1
            className="text-4xl font-bold mb-8 text-gray-900 text-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            GenBI Purwokerto Berada di Bawah
          </motion.h1>
          <motion.h2
            className="text-2xl font-bold mb-12 text-gray-900 text-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Naungan KPW BI Purwokerto
          </motion.h2>

          <div className="mb-16 flex justify-center">
            <motion.img
              src="https://upload.wikimedia.org/wikipedia/commons/3/39/BI_Logo.png"
              alt="Bank Indonesia"
              className="max-w-[400px]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            />
          </div>

          <motion.h2
            className="text-4xl font-bold mb-8 text-gray-900 text-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Universitas
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'UIN SAIZU', logo: 'https://uinsaizu.ac.id/images/LOGO-UIN.png' },
              { name: 'Universitas Jenderal Soedirman', logo: 'https://perpus.unsoed.ac.id/wp-content/uploads/2024/03/Universitas-Jendral-Soedirman-Logo.png' },
              { name: 'UMP', logo: '../images/logo-ump.png'}
            ].map((uni, index) => (
              <motion.div
                className="text-center"
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
              >
                <img src={uni.logo} alt={uni.name} className="max-w-[150px] mx-auto" />
                <p className="text-gray-700 mt-4">{uni.name}</p>
              </motion.div>
            ))}
          </div>
          <br/>
          <motion.h2
            className="text-4xl font-bold mb-8 text-gray-900 text-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
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
      <Footer />
    </>
  );
};

export default Organization;