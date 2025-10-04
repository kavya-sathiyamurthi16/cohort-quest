import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white border-t border-gray-200 mt-auto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Logo and Description */}
          <div className="flex items-center space-x-3">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center"
            >
              <Zap className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Cohort Quest</h3>
              <p className="text-sm text-gray-500">Gamified Learning Ecosystem</p>
            </div>
          </div>

          {/* Version Info */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Version 1.0</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              href="#"
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              href="#"
              className="p-2 text-gray-400 hover:text-blue-500 transition-colors duration-200"
            >
              <Twitter className="w-5 h-5" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              href="#"
              className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            © 2024 Cohort Quest. All rights reserved. Built for educational excellence.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
