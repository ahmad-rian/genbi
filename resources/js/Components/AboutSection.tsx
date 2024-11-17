// resources/js/Components/AboutSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Users, BookOpen } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface AboutSectionProps {
  isDark?: boolean;
}

const features = [
  {
    icon: Star,
    title: 'Inovasi',
    description: 'Kami mendorong anggota kami untuk berinovasi dan kreatif, mengembangkan solusi yang berdampak langsung pada masyarakat.',
    gradient: 'from-blue-600 to-blue-400'
  },
  {
    icon: Users,
    title: 'Dampak Sosial',
    description: 'Anggota kami berkomitmen untuk memberikan dampak sosial positif, menyebarkan informasi akurat tentang kebijakan Bank Indonesia.',
    gradient: 'from-blue-500 to-blue-300'
  },
  {
    icon: BookOpen,
    title: 'Pembelajaran Berkelanjutan',
    description: 'Kami percaya pada kekuatan perbaikan diri yang berkelanjutan, selalu berusaha belajar dan tumbuh sebagai individu dan komunitas.',
    gradient: 'from-blue-700 to-blue-500'
  }
];

const AboutSection: React.FC<AboutSectionProps> = ({ isDark = false }) => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute inset-0 ${
          isDark ? 'bg-gray-900/95' : 'bg-white/95'
        }`} />
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-blue-500/10 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-blue-500/10 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className={`text-5xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Tentang GenBI Purwokerto
          </h2>
          <div className="w-20 h-2 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mb-8 rounded-full" />
          <p className={`text-xl leading-relaxed ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            GenBI Purwokerto adalah komunitas penerima beasiswa Bank Indonesia yang bertujuan untuk meningkatkan kepekaan sosial dan menumbuhkan semangat pengabdian kepada masyarakat.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`group p-8 rounded-2xl backdrop-blur-xl transition-all duration-300 ${
                isDark
                  ? 'bg-gray-800/40 hover:bg-gray-800/60'
                  : 'bg-white/60 hover:bg-white/80'
              } border border-blue-100/20 hover:shadow-xl hover:border-blue-200/30`}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} p-3 mb-6 transform transition-transform group-hover:scale-110`}>
                <feature.icon className="w-full h-full text-white" />
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`}>
                {feature.title}
              </h3>
              <p className={`${
                isDark ? 'text-gray-300' : 'text-gray-600'
              } leading-relaxed`}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/tentang"
            className={`group inline-flex items-center px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 
              ${isDark 
                ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600' 
                : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600'
              } text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
          >
            Pelajari Lebih Lanjut
            <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;