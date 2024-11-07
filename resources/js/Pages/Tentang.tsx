import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { FaRocket, FaHandsHelping, FaRegLightbulb, FaShareAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Tentang = () => {
  const missionItems = [
    {
      icon: <FaRocket />,
      title: "Initiate",
      description: "Menginisiasi kegiatan yang bertujuan untuk memberdayakan masyarakat Jawa Tengah."
    },
    {
      icon: <FaHandsHelping />,
      title: "Act",
      description: "Aktif dalam melakukan aksi nyata sebagai garda terdepan untuk menyampaikan tugas dan fungsi serta peranan Bank Indonesia kepada masyarakat Jawa Tengah."
    },
    {
      icon: <FaShareAlt />,
      title: "Share",
      description: "Berkontribusi dalam melakukan pemberdayaan masyarakat dengan bekerjasama dengan lembaga-lembaga terkait."
    },
    {
      icon: <FaRegLightbulb />,
      title: "Inspire",
      description: "Berbagi inspirasi dan motivasi untuk menjadi energi untuk negeri guna menumbuhkan kesadaran masyarakat akan kepedulian sosial."
    }
  ];

  return (
    <>
      <Head title="Tentang" />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <Navbar />

        <main className="container mx-auto py-20 px-4">
          {/* Bagian Visi */}
          <section className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-8 text-center lg:text-left mb-16">
            <motion.div 
              className="mb-8 lg:mb-0 lg:w-1/3 flex justify-center lg:justify-end"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img src="../images/logo.png" alt="Logo" className="w-48 h-48 object-contain" />
            </motion.div>

            <motion.div className="bg-white p-6 rounded-lg shadow-lg lg:w-2/3"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-blue-600 mb-4">Visi</h2>
              <ul className="text-gray-700 space-y-4">
                <li>1. Menjadikan kaum muda Indonesia sebagai generasi yang kompeten dalam berbagai bidang keilmuan serta dapat membawa perubahan positif dan menjadi inspirasi bagi bangsa dan negara.</li>
                <li>2. Menjadikan Generasi Baru Indonesia Provinsi Jawa Tengah sebagai generasi yang kompeten dalam berbagai bidang keilmuan serta dapat membawa perubahan positif dan menjadi inspirasi bagi bangsa dan negara pada umumnya dan Provinsi Jawa Tengah pada khususnya.</li>
              </ul>
            </motion.div>
          </section>

          {/* Bagian Misi */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-blue-600">Misi</h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-6">
            {missionItems.map((item, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg w-full md:w-72 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-blue-600 text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Tentang;