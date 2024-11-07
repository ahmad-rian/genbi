// resources/js/Components/Footer.tsx
import React from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

const Footer = () => (
  <motion.footer
    className="bg-blue-900 text-white"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About GenBI */}
        <div className="col-span-2">
          <img
            src="/images/genbi-logo.png"
            alt="GenBI Logo"
            className="h-12 w-auto mb-4"
          />
          <p className="text-blue-100 mt-4 max-w-md">
            Generasi Baru Indonesia (GenBI) adalah komunitas penerima beasiswa Bank Indonesia yang berkomitmen untuk keunggulan dan dampak sosial.
          </p>
          <div className="mt-6 flex space-x-4">
            <Link 
              href="https://www.instagram.com/genbipurwokerto/" 
              className="text-blue-100 hover:text-white transition duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </Link>
            <Link 
              href="https://www.youtube.com/@genbipurwokerto1177" 
              className="text-blue-100 hover:text-white transition duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">YouTube</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </Link>
            <Link 
      href="https://www.tiktok.com/@genbipurwokerto?_t=8rCOYXw0J32&_r=1" 
      className="text-blue-100 hover:text-white transition duration-300"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="sr-only">TikTok</span>
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9.353 2.57c.591-1.03 1.463-1.97 2.62-2.57.597.785 1.295 1.455 2.05 1.99.61.46 1.328.765 2.098.84.12.758.292 1.51.522 2.243.272.898.748 1.707 1.393 2.365.645.659 1.443 1.144 2.325 1.407v2.936c-1.064-.02-2.109-.26-3.053-.706-.785-.387-1.498-.925-2.096-1.553-.43.738-1.054 1.385-1.812 1.89-.825.553-1.796.918-2.81 1.04-1.014.122-2.043-.014-2.982-.389-.887-.358-1.673-.944-2.267-1.678-.58-.727-.997-1.59-1.22-2.5-.184-.69-.27-1.405-.254-2.118-.003-1.06.335-2.093.968-2.923.63-.835 1.492-1.464 2.452-1.81 1.03-.38 2.147-.4 3.203-.056-.012.853.033 1.707.15 2.552.043.294-.055.598-.26.818-.206.222-.496.362-.8.387-.722.036-1.446-.046-2.15-.245-.742-.213-1.447-.546-2.056-1.003-.462-.352-.905-.76-1.268-1.236.388-.27.8-.494 1.226-.675z"/>
      </svg>
    </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <Link href="/tentang" className="text-blue-100 hover:text-white transition duration-300">
                Tentang Kami
              </Link>
            </li>
            <li>
              <Link href="/kegiatan" className="text-blue-100 hover:text-white transition duration-300">
                Kegiatan
              </Link>
            </li>
            <li>
              <Link href="/kontak" className="text-blue-100 hover:text-white transition duration-300">
                Kontak
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-blue-100">
            <li className="flex items-center group">
              <svg className="h-5 w-5 mr-2 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:genbipurwokerto22@gmail.com" className="hover:text-white transition-colors duration-300">
                genbipurwokerto22@gmail.com
              </a>
            </li>
            <li className="flex items-center group">
              <svg className="h-5 w-5 mr-2 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href="tel:+6289667443651" className="hover:text-white transition-colors duration-300">
                +62 89667443651
              </a>
            </li>
            <li className="flex items-start group">
              <svg className="h-5 w-5 mr-2 mt-1 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <a 
                href="https://maps.app.goo.gl/9iGh4hGHk8z4L2vy8" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-300"
              >
                Jl. Jend. Gatot Subroto No.98, Brubahan, Purwanegara, Kec. Purwokerto Tim., Kabupaten Banyumas, Jawa Tengah 53116
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-blue-800">
        <p className="text-center text-blue-100">
          © {new Date().getFullYear()} GenBI. All rights reserved.
        </p>
      </div>
    </div>
  </motion.footer>
);

export default Footer;