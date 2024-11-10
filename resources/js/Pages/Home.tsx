import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Award, Users, Target } from 'lucide-react';
import { useTheme } from '@/Hooks/useTheme';
import Hero from '@/Components/Hero';

interface NewsItem {
    id: number;
    title: string;
    date: string;
    image: string;
}

interface Props {
    news: NewsItem[];
}

const GenBIPointSection = ({ isDark }: { isDark: boolean }) => {
    const features = [
        {
            icon: Award,
            title: "Sistem Penghargaan",
            description: "Apresiasi khusus untuk kontribusi aktif anggota dalam komunitas"
        },
        {
            icon: Users,
            title: "Kolaborasi Tim",
            description: "Mendorong kerja sama dan partisipasi dalam kegiatan komunitas"
        },
        {
            icon: Target,
            title: "Pencapaian Terukur",
            description: "Pantau dan tingkatkan performa dengan metrik yang jelas"
        }
    ];

    return (
        <div className="relative py-24 overflow-hidden">
            <div className={`absolute inset-0 ${
                isDark 
                    ? 'bg-gradient-to-br from-blue-950/20 via-gray-900/40 to-gray-950/20' 
                    : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'
            }`} />
            
            <div className="container mx-auto px-4 lg:px-16 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="space-y-6">
                            <div className="inline-block">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "100%" }}
                                    transition={{ duration: 0.6 }}
                                    className="bg-blue-600 h-1 w-16 mb-6"
                                />
                            </div>
                            
                            <h2 className={`text-4xl lg:text-5xl font-bold leading-tight ${
                                isDark ? 'text-white' : 'text-gray-900'
                            }`}>
                                GenBI Point
                            </h2>
                            
                            <p className={`text-lg lg:text-xl ${
                                isDark ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                                Sistem penghargaan inovatif yang memberikan apresiasi kepada anggota GenBI atas kontribusi aktif dan partisipasi mereka dalam komunitas.
                            </p>
                            
                            <div className="space-y-8 mt-12">
                                {features.map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="flex items-start space-x-4"
                                    >
                                        <div className={`p-3 rounded-lg ${
                                            isDark ? 'bg-blue-900/30' : 'bg-blue-50'
                                        }`}>
                                            <feature.icon className={`w-6 h-6 ${
                                                isDark ? 'text-blue-400' : 'text-blue-600'
                                            }`} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className={`text-lg font-semibold mb-1 ${
                                                isDark ? 'text-white' : 'text-gray-900'
                                            }`}>{feature.title}</h3>
                                            <p className={`${
                                                isDark ? 'text-gray-400' : 'text-gray-600'
                                            }`}>{feature.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                viewport={{ once: true }}
                                className="mt-8"
                            >
                                <Link
                                    href="/genbi-point"
                                    className={`group inline-flex items-center px-6 py-3 rounded-full font-semibold transition duration-300 ease-in-out hover:shadow-lg transform hover:-translate-y-1 ${
                                        isDark
                                            ? 'bg-blue-600 text-white hover:bg-blue-500'
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                                >
                                    Lihat Selengkapnya
                                    <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className={`absolute inset-0 rounded-3xl ${
                            isDark 
                                ? 'bg-gradient-to-br from-blue-600/10 to-purple-600/10' 
                                : 'bg-gradient-to-br from-blue-100/50 to-purple-100/50'
                        } blur-3xl transform -rotate-6`} />
                        <img 
                            src="./images/Hero Image GenBI Point.svg"
                            alt="GenBI Point Illustration"
                            className="relative w-full h-auto max-w-lg mx-auto transform hover:scale-105 transition-transform duration-500"
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default function Home({ news }: Props) {
    const { isDark } = useTheme();

    const presidentProfiles = [
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

    return (
        <MainLayout>
            <Hero />

            {/* GenBI Point Section */}
            <GenBIPointSection isDark={isDark} />

            {/* Bagian Tentang Kami */}
            <section className="py-20 px-4 relative">
                <div className={`absolute inset-0 ${
                    isDark
                        ? 'bg-gradient-to-b from-transparent via-gray-800/30 to-transparent'
                        : 'bg-gradient-to-b from-transparent via-blue-50/30 to-transparent'
                }`} />
                <div className="container mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto text-center mb-12"
                    >
                        <h2 className={`text-4xl font-bold mb-4 ${
                            isDark ? 'text-white' : 'text-gray-900'
                        }`}>Tentang GenBI Purwokerto</h2>
                        <div className="w-16 h-1 bg-blue-500 mx-auto mb-8"></div>
                        <p className={`text-lg leading-relaxed ${
                            isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                            GenBI Purwokerto adalah komunitas penerima beasiswa Bank Indonesia yang bertujuan untuk meningkatkan kepekaan sosial dan menumbuhkan semangat pengabdian kepada masyarakat. Kami bertujuan untuk mengembangkan pemimpin yang dapat terhubung dengan akar rumput dan mempertahankan proses perbaikan diri yang berkelanjutan.
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
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
                                className={`backdrop-blur-sm p-8 rounded-lg shadow-lg border ${
                                    isDark
                                        ? 'bg-gray-800/60 border-gray-700/50 hover:bg-gray-700/60'
                                        : 'bg-white/60 border-blue-100/50 hover:bg-white/80'
                                } transition-all duration-300`}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                            >
                                <h3 className={`text-2xl font-bold mb-4 ${
                                    isDark ? 'text-blue-400' : 'text-blue-600'
                                }`}>{item.title}</h3>
                                <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="mt-12 text-center"
                    >
                        <Link
                            href="/tentang"
                            className={`group inline-flex items-center px-8 py-3 rounded-full font-semibold transition duration-300 ease-in-out hover:shadow-lg transform hover:-translate-y-1 ${
                                isDark
                                    ? 'bg-blue-600 text-white hover:bg-blue-500'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                        >
                            Pelajari Lebih Lanjut
                            <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Company Profile Video Section */}
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
                        }`}>COMPANY PROFILE</h2>
                        <div className="w-16 h-1 bg-blue-500 mx-auto mt-4"></div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className={`relative rounded-xl overflow-hidden shadow-2xl p-4 ${
                            isDark
                                ? 'bg-gray-800/70 backdrop-blur-sm'
                                : 'bg-white/70 backdrop-blur-sm'
                        }`}>
                            <div className="aspect-video relative">
                                <iframe
                                    className="w-full h-full rounded-lg"
                                    src="https://www.youtube.com/embed/x7xMqTNOR9Y"
                                    title="Company Profile GENBI Purwokerto"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div className="mt-4 flex items-center justify-center gap-4">
                                <a
                                    href="https://youtu.be/x7xMqTNOR9Y?si=rFrrHlFUYYwGGKAT"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`group inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${
                                        isDark
                                            ? 'bg-blue-600 text-white hover:bg-blue-500'
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                                >
                                    <Play size={20} />
                                    <span>Tonton di YouTube</span>
                                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Pesan GenBI Section */}
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
                        }`}>PESAN GENBI</h2>
                        <div className="w-16 h-1 bg-blue-500 mx-auto mt-4"></div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {presidentProfiles.map((profile, index) => (
                            <motion.div
                                key={index}
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
                                    {/* Badge */}
                                    <div className="absolute top-4 left-4 z-10">
                                        <div className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md">
                                            <p className="text-sm font-semibold">Presiden Komisariat</p>
                                            <p className="text-xs">{profile.universityShort}</p>
                                        </div>
                                    </div>

                                    {/* Profile Image with Gradient Overlay */}
                                    <div className="relative h-[460px] overflow-hidden group-hover:scale-105 transition-transform duration-500">
                                        <img
                                            src={profile.image}
                                            alt={profile.name}
                                            className="w-full h-full object-cover object-center"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
                                    </div>

                                    {/* Profile Info */}
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
                                        }`}></div>
                                        <p className={`italic text-sm ${
                                            isDark ? 'text-gray-300' : 'text-gray-700'
                                        }`}>
                                            {profile.quote}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}