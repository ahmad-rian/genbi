// resources/js/Pages/Home.tsx
import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useTheme } from '@/Hooks/useTheme';
import Hero from '@/Components/Hero';
import HeroGenBIPoint from '@/Components/HeroGenBIPoint';


interface NewsItem {
    id: number;
    title: string;
    date: string;
    image: string;
}

export default function Home() {
    const { isDark } = useTheme();
    return (
        <MainLayout title="GenBI Point | GenBI Purwokerto">
            <HeroGenBIPoint />

            <div className="flex items-center justify-center flex-col py-16">
                <h1 className='text-4xl'>PENJELASAN GENBI POINT DAN SOTM RENCANANYA</h1>
                <p>PENJELASAN GENBI POINT DAN SOTM dikerjain setelah aku ngajuin outline di hari selasa</p>
            </div>

        </MainLayout>
    )
}
