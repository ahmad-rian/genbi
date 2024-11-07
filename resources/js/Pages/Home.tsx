import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Hero from '@/Components/Hero';
import Footer from '@/Components/Footer';
import { motion } from 'framer-motion';

interface NewsItem {
  id: number;
  title: string;
  date: string;
  image: string;
}

interface Props {
  news: NewsItem[];
}

export default function Home({ news }: Props) {
  return (
    <>
      <Head title="Home" />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <Navbar />
        <Hero />

        {/* Bagian Tentang Kami */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="max-w-4xl mx-auto text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4 text-gray-900">Tentang GenBI Purwokerto</h2>
              <div className="w-16 h-1 bg-blue-500 mx-auto mb-8"></div>
              <p className="text-lg text-gray-700 leading-relaxed">
                GenBI Purwokerto adalah komunitas penerima beasiswa Bank Indonesia yang bertujuan untuk meningkatkan kepekaan sosial dan menumbuhkan semangat pengabdian kepada masyarakat. Kami bertujuan untuk mengembangkan pemimpin yang dapat terhubung dengan akar rumput dan mempertahankan proses perbaikan diri yang berkelanjutan.
              </p>
            </motion.div>

            {/* Bagian Grid dengan Animasi */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.2 } },
              }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                { title: 'Inovasi', description: 'Kami mendorong anggota kami untuk berinovasi dan kreatif, mengembangkan solusi yang berdampak langsung pada masyarakat.' },
                { title: 'Dampak Sosial', description: 'Anggota kami berkomitmen untuk memberikan dampak sosial positif, menyebarkan informasi akurat tentang kebijakan Bank Indonesia dan berkontribusi pada kemajuan ekonomi negara.' },
                { title: 'Pembelajaran Berkelanjutan', description: 'Kami percaya pada kekuatan perbaikan diri yang berkelanjutan, selalu berusaha belajar dan tumbuh sebagai individu dan sebagai komunitas.' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-8 rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
                >
                  <h3 className="text-2xl font-bold mb-4 text-blue-600">{item.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Tombol Pelajari Lebih Lanjut */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="mt-12 text-center"
            >
              <Link
                href="/tentang"
                className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full font-semibold transition duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-1"
              >
                Pelajari Lebih Lanjut
              </Link>
            </motion.div>
          </div>
        </section>

        
        <Footer />
      </div>
    </>
  );
}
