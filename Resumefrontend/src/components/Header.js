"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const headerVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

const linkVariants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.95 },
}

function Header() {
  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-800 transition-all duration-300"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between">
          <motion.div variants={linkVariants} whileHover="hover" whileTap="tap" className="flex items-center">
            <Link to="/">
              <span className="sr-only">Resume Analyzer</span>
              <img className="h-10 w-auto filter drop-shadow-md" src="/logo.svg" alt="Logo" />
            </Link>
          </motion.div>
          <div className="ml-10 space-x-4">
            <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300"
              >
                Home
              </Link>
            </motion.div>
            <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
              <Link
                to="/about"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 transition-colors duration-300"
              >
                About
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>
    </motion.header>
  )
}

export default Header

