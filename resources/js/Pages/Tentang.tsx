import MainLayout from '@/Layouts/MainLayout';
import { FaRocket, FaHandsHelping, FaRegLightbulb, FaShareAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTheme } from '@/Hooks/useTheme';

const Tentang = () => {
  const { isDark } = useTheme();
  
  const missionItems = [
    {
      icon: <FaRocket className="text-blue-500" />,
      title: "Initiate",
      description: "Menginisiasi kegiatan yang bertujuan untuk memberdayakan masyarakat Jawa Tengah.",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: <FaHandsHelping className="text-indigo-500" />,
      title: "Act",
      description: "Aktif dalam melakukan aksi nyata sebagai garda terdepan untuk menyampaikan tugas dan fungsi serta peranan Bank Indonesia kepada masyarakat Jawa Tengah.",
      gradient: "from-indigo-500 to-indigo-600"
    },
    {
      icon: <FaShareAlt className="text-purple-500" />,
      title: "Share",
      description: "Berkontribusi dalam melakukan pemberdayaan masyarakat dengan bekerjasama dengan lembaga-lembaga terkait.",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: <FaRegLightbulb className="text-sky-500" />,
      title: "Inspire",
      description: "Berbagi inspirasi dan motivasi untuk menjadi energi untuk negeri guna menumbuhkan kesadaran masyarakat akan kepedulian sosial.",
      gradient: "from-sky-500 to-sky-600"
    }
  ];

  return (
    <MainLayout title="Tentang">
      <main className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Hero Section with Visi */}
        <section className="relative mb-24">
          <motion.div 
            className={`absolute inset-0 rounded-3xl ${
              isDark ? 'bg-gray-800' : 'bg-gray-100'
            }`}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
          <div className="relative flex flex-col lg:flex-row items-center gap-12 p-8 md:p-12">
            <motion.div 
              className="lg:w-1/3"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="../images/logo.png" 
                alt="Logo" 
                className="w-48 h-48 object-contain mx-auto lg:mx-0 drop-shadow-lg"
              />
            </motion.div>

            <motion.div 
              className="lg:w-2/3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className={`${
                isDark ? 'bg-gray-900' : 'bg-white'
              } p-8 rounded-2xl shadow-md`}>
                <h2 className={`text-3xl font-bold mb-6 flex items-center gap-3 ${
                  isDark ? 'text-blue-400' : 'text-blue-800'
                }`}>
                  Visi
                  <div className="h-1 flex-grow bg-gradient-to-r from-blue-300 to-transparent rounded-full" />
                </h2>
                <ul className={`space-y-6 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <li className="flex gap-4 items-start">
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm text-white ${
                      isDark ? 'bg-blue-600' : 'bg-gray-700'
                    }`}>1</span>
                    <p>Menjadikan kaum muda Indonesia sebagai generasi yang kompeten dalam berbagai bidang keilmuan serta dapat membawa perubahan positif dan menjadi inspirasi bagi bangsa dan negara.</p>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm text-white ${
                      isDark ? 'bg-blue-600' : 'bg-gray-700'
                    }`}>2</span>
                    <p>Menjadikan Generasi Baru Indonesia Provinsi Jawa Tengah sebagai generasi yang kompeten dalam berbagai bidang keilmuan serta dapat membawa perubahan positif dan menjadi inspirasi bagi bangsa dan negara pada umumnya dan Provinsi Jawa Tengah pada khususnya.</p>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Misi Section */}
        <section className="mb-24">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={`text-3xl font-bold inline-flex items-center gap-4 ${
              isDark ? 'text-blue-400' : 'text-blue-800'
            }`}>
              <div className="h-1 w-12 bg-gradient-to-r from-transparent to-blue-500 rounded-full" />
              Misi
              <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {missionItems.map((item, index) => (
              <motion.div 
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                <div className={`relative p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border ${
                  isDark 
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white border-gray-100'
                }`}>
                  <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className={`text-xl font-semibold mb-4 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>{item.title}</h3>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default Tentang;