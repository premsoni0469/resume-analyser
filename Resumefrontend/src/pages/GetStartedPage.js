"use client"

import { useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useDropzone } from "react-dropzone"
import { motion } from "framer-motion"
import { CloudUploadIcon, DocumentTextIcon, ChartBarIcon } from "@heroicons/react/outline"

// First, install react-dropzone: npm install react-dropzone

const HomePage = () => {
  const [file, setFile] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const navigate = useNavigate()

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0])
    simulateUpload()
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const simulateUpload = () => {
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
        setTimeout(() => navigate("/results"), 500)
      }
    }, 200)
  }

  return (
    <div className="container mx-auto px-4 py-12 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">AI-Powered Resume Analysis</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Upload your resume and get instant feedback to improve your chances of landing your dream job.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="max-w-md mx-auto"
      >
        <div
          {...getRootProps()}
          className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-all duration-300 bg-white dark:bg-gray-800 backdrop-filter backdrop-blur-lg bg-opacity-50 dark:bg-opacity-50 ${
            isDragActive
              ? "border-primary-500 bg-primary-50 dark:bg-primary-900"
              : "border-gray-300 dark:border-gray-700 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900"
          }`}
        >
          <input {...getInputProps()} />
          <CloudUploadIcon className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Drag & drop your resume here, or click to select a file
          </p>
        </div>

        {file && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">{file.name}</p>
            <div className="mt-2 h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-primary-500 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {[
          {
            icon: DocumentTextIcon,
            title: "ATS-Friendly Analysis",
            description: "Ensure your resume passes through Applicant Tracking Systems with our AI-powered analysis.",
          },
          {
            icon: ChartBarIcon,
            title: "Detailed Insights",
            description: "Get comprehensive feedback on your resume's content, format, and keywords.",
          },
          {
            icon: DocumentTextIcon,
            title: "Improvement Suggestions",
            description: "Receive personalized recommendations to enhance your resume and stand out to employers.",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-50 dark:bg-opacity-50"
          >
            <item.icon className="h-12 w-12 text-primary-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default HomePage

