import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { motion } from 'framer-motion';
import { FaInstagram, FaYoutube, FaMapMarkerAlt, FaEnvelope, FaPhone, FaTiktok } from 'react-icons/fa';
import { useTheme } from '@/Hooks/useTheme';

const Contact = () => {
  const { isDark } = useTheme();

  return (
    <MainLayout title="Contact">
      <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Contact Info & Social Media */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div>
                <h1 className={`text-3xl font-bold mb-8 ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}>Contact Us</h1>
                
                {/* Address */}
                <div className="flex items-start gap-3 mb-4">
                  <FaMapMarkerAlt className="text-blue-500 text-xl flex-shrink-0 mt-1" />
                  <a 
                    href="https://maps.app.goo.gl/9iGh4hGHk8z4L2vy8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`hover:text-blue-500 transition-colors ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    Jl. Jend. Gatot Subroto No.98, Brubahan, Purwanegara, Kec. Purwokerto Tim., Kabupaten Banyumas, Jawa Tengah 53116
                  </a>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3 mb-4">
                  <FaEnvelope className="text-blue-500 text-xl" />
                  <a 
                    href="mailto:genbipurwokerto22@gmail.com" 
                    className={`hover:text-blue-500 transition-colors ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    genbipurwokerto22@gmail.com
                  </a>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3">
                  <FaPhone className="text-blue-500 text-xl" />
                  <a 
                    href="tel:+6289667443651" 
                    className={`hover:text-blue-500 transition-colors ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    +62 89667443651
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h2 className={`text-2xl font-bold mb-4 ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}>Follow Us</h2>
                <div className="flex gap-4">
                  <a 
                    href="https://www.instagram.com/genbipurwokerto/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-2xl text-[#E4405F] hover:opacity-80 transition-opacity"
                  >
                    <FaInstagram />
                  </a>
                  <a 
                    href="https://www.youtube.com/@genbipurwokerto1177" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-2xl text-[#FF0000] hover:opacity-80 transition-opacity"
                  >
                    <FaYoutube />
                  </a>
                  <a 
                    href="https://www.tiktok.com/@genbipurwokerto" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`text-2xl hover:opacity-80 transition-opacity ${
                      isDark ? 'text-white' : 'text-[#000000]'
                    }`}
                  >
                    <FaTiktok />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className={`${
                isDark 
                  ? 'bg-gray-800 border border-gray-700'
                  : 'bg-gray-50'
              } p-8 rounded-lg`}
            >
              <form className="space-y-6">
                {/* Name Input */}
                <div>
                  <label 
                    htmlFor="name" 
                    className={`block text-sm font-medium mb-1 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Your Name <span className="text-blue-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    className={`w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    required
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label 
                    htmlFor="email" 
                    className={`block text-sm font-medium mb-1 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Email <span className="text-blue-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    required
                  />
                </div>

                {/* Subject Input */}
                <div>
                  <label 
                    htmlFor="subject" 
                    className={`block text-sm font-medium mb-1 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Subject <span className="text-blue-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className={`w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    required
                  />
                </div>

                {/* Message Input */}
                <div>
                  <label 
                    htmlFor="message" 
                    className={`block text-sm font-medium mb-1 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Your Message <span className="text-blue-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className={`w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors font-medium"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>

          {/* Map Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.2735405364376!2d109.2477423!3d-7.426192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e655ea49d9f9885%3A0x62be0b6159700ec9!2sBank%20Indonesia%20-%20Purwokerto!5e0!3m2!1sen!2sid!4v1699444037838!5m2!1sen!2sid"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className={`rounded-lg shadow-md ${
                isDark ? 'opacity-80' : 'opacity-100'
              }`}
            />
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Contact;