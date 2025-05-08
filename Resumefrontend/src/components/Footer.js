"use client"

import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { GithubIcon, TwitterIcon, FacebookIcon } from "lucide-react"

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
}

const Footer = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      initial="hidden"
      animate="visible"
      variants={footerVariants}
      className="relative bg-gradient-to-b from-white/80 to-gray-50/80 dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-xl border-t border-gray-200/20 dark:border-gray-800/20 mt-auto transition-colors duration-300 ease-in-out"
    >
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <motion.div variants={itemVariants} className="space-y-8 xl:col-span-1">
            <Link to="/" className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="text-2xl font-bold text-blue-500 bg-clip-text"
              >
                ResumeAI
              </motion.div>
            </Link>
            <div className="h-6 bg-transparent">

            </div>
            {/* <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-md">
              Making the world a better place through AI-powered resume analysis and career advancement solutions.
            </p> */}
            <div className="flex space-x-6">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
              >
                <span className="sr-only">Facebook</span>
                <FacebookIcon className="h-6 w-6" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
              >
                <span className="sr-only">Twitter</span>
                <TwitterIcon className="h-6 w-6" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
              >
                <span className="sr-only">GitHub</span>
                <GithubIcon className="h-6 w-6" />
              </motion.a>
            </div>
          </motion.div>

          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <motion.div variants={itemVariants}>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500">
                  Solutions
                </h3>
                <ul className="mt-4 space-y-4">
                  {["Resume Analysis", "Career Coaching", "Job Search"].map((item) => (
                    <motion.li key={item} whileHover={{ x: 5 }} className="text-base text-gray-600 dark:text-gray-300">
                      <a href="#">{item}</a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500">
                  Support
                </h3>
                <ul className="mt-4 space-y-4">
                  {["Contact Us", "FAQ", "Privacy Policy"].map((item) => (
                    <motion.li key={item} whileHover={{ x: 5 }} className="text-base text-gray-600 dark:text-gray-300">
                      <a href="#">{item}</a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <div className="md:grid md:grid-cols-2 md:gap-8">
              {/* <motion.div variants={itemVariants}>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500">
                  Company
                </h3>
                <ul className="mt-4 space-y-4">
                  {["About", "Blog", "Careers"].map((item) => (
                    <motion.li key={item} whileHover={{ x: 5 }} className="text-base text-gray-600 dark:text-gray-300">
                      <a href="#">{item}</a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div> */}

              {/* <motion.div variants={itemVariants} className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500">
                  Legal
                </h3>
                <ul className="mt-4 space-y-4">
                  {["Terms of Service", "Privacy Policy", "Cookie Policy"].map((item) => (
                    <motion.li key={item} whileHover={{ x: 5 }} className="text-base text-gray-600 dark:text-gray-300">
                      <a href="#">{item}</a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div> */}
            </div>
          </div>
        </div>

      </div>
        <motion.div variants={itemVariants} className="py-7">
          <p className="text-base text-gray-500 dark:text-gray-400 text-center">
            &copy; {currentYear} Resume Analyzer AI. All rights reserved.
          </p>
        </motion.div>
    </motion.footer>
  )
}

export default Footer

