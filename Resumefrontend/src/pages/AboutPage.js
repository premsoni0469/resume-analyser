"use client"

import { motion } from "framer-motion"
import { UserGroupIcon, LightBulbIcon, ChartBarIcon } from "@heroicons/react/24/outline"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-blue-600 bg-clip-text">
            About Us
            </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-600 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl font-medium">
            Empowering job seekers with cutting-edge AI technology to create standout resumes.
          </p>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300"
          >
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg transform rotate-12" />
            <div className="relative">
              <UserGroupIcon className="h-12 w-12 text-white mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-300">
                To revolutionize the job application process by providing job seekers with powerful AI-driven tools to
                create impactful resumes and increase their chances of landing their dream jobs.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="relative bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300"
          >
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg transform rotate-12" />
            <div className="relative">
              <LightBulbIcon className="h-12 w-12 text-white mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Our Vision</h2>
              <p className="text-gray-600 dark:text-gray-300">
                To become the go-to platform for job seekers worldwide, offering innovative solutions that bridge the
                gap between talent and opportunity in the ever-evolving job market.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="relative bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300"
          >
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-pink-500 to-red-500 rounded-lg transform rotate-12" />
            <div className="relative">
              <ChartBarIcon className="h-12 w-12 text-white mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Our Impact</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Since our inception, we've helped thousands of job seekers optimize their resumes, resulting in a 40%
                increase in interview callbacks and a 25% higher job placement rate for our users.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Team</h2>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl">
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We're a diverse group of AI experts, data scientists, and career coaches passionate about helping you
              succeed in your job search. Our team combines decades of industry experience with cutting-edge AI
              technology to provide you with the best tools for your career journey.
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">AI Development</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Leading experts in machine learning and natural language processing
                </p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Career Coaching</h3>
                <p className="text-gray-600 dark:text-gray-300">Experienced professionals from diverse industries</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-pink-50 to-red-50 dark:from-gray-700 dark:to-gray-600 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Customer Success</h3>
                <p className="text-gray-600 dark:text-gray-300">Dedicated team ensuring your success</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

