"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline"
import { useLocation } from "react-router-dom";

import jsPDF from "jspdf"
import html2canvas from "html2canvas"

const ResultsPage = () => {
  const [isEnhancementModalOpen, setIsEnhancementModalOpen] = useState(false)
  const [openFAQ, setOpenFAQ] = useState(null)
  const resultsRef = useRef(null)

  const location = useLocation();
  const {analysisData} = location.state || {};
  const mockResults = {
      overallScore: Math.floor(analysisData)
  }


  // const mockResults = {
  //   overallScore: 75,
  //   atsCompatibility: 80,
  //   contentQuality: 75,
  //   readabilityScore: 85,
  //   keywordOptimization: 70,
  //   jobMarketMatch: 78,
  //   grammarSpelling: 90,
  //   actionVerbUsage: 65,
  //   resumeLengthFormatting: 85,
  //   suggestions: [
  //     "Move Certifications to the Top for Better Visibility",
  //     "Add more quantifiable achievements in your Work Experience section",
  //     "Consider adding a Skills section to highlight your technical abilities",
  //   ],
  //   keywordAnalysis: [
  //     { keyword: "project management", count: 5 },
  //     { keyword: "agile", count: 3 },
  //     { keyword: "leadership", count: 4 },
  //     { keyword: "data analysis", count: 2 },
  //   ],
  //   jobRoleMatch: [
  //     { role: "Project Manager", match: 85 },
  //     { role: "Product Owner", match: 75 },
  //     { role: "Scrum Master", match: 70 },
  //   ],
  // }

  

  const handleDownloadPDF = async () => {
    const input = resultsRef.current
    const canvas = await html2canvas(input)
    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF()
    const imgProps = pdf.getImageProperties(imgData)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
    pdf.save("resume_analysis_report.pdf")
  }

  const faqs = [
    {
      question: "What is ATS compatibility?",
      answer:
        "ATS compatibility refers to how well your resume can be parsed by Applicant Tracking Systems used by employers. A higher score means better chances of your resume being properly read and processed by these systems.",
    },
    {
      question: "How can I improve my resume's keyword optimization?",
      answer:
        "To improve keyword optimization, carefully review the job description and incorporate relevant industry terms and skills throughout your resume. Be sure to use these keywords naturally and in context.",
    },
    {
      question: "What factors contribute to the content quality score?",
      answer:
        "The content quality score considers factors such as the use of action verbs, quantifiable achievements, relevant skills, and overall clarity and conciseness of your resume content.",
    },
    {
      question: "How does AI-powered resume enhancement work?",
      answer:
        "AI-powered enhancement analyzes your resume against industry standards and job market trends. It then provides tailored suggestions to improve your resume's effectiveness, such as rephrasing sentences, reorganizing sections, or adding missing key information.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto md:px-24 lg:px-56 py-12 min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20"
    >
      <motion.div variants={itemVariants} className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-blue-600">
          Resume Analysis Results
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Here's a detailed breakdown of your resume's performance.
        </p>
      </motion.div>
      
      <motion.div ref={resultsRef} variants={containerVariants}>
        <motion.div variants={itemVariants} className="grid-cols-1 md:grid-cols-2 gap-6 mb-8 ">
          <motion.div whileHover={{ scale: 1.02 }} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg ">
            <h3 className="text-xl font-semibold mb-4">Your Resume Score :</h3>
            <div className="flex items-center justify-center">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <motion.path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="3"
                  />
                  <motion.path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: mockResults.overallScore / 100 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                </svg>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="text-3xl font-bold text-gray-600 dark:text-white">{mockResults.overallScore}%</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
          {/* <motion.div whileHover={{ scale: 1.02 }} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Key Metrics</h3>
            <ul className="space-y-2">
              {Object.entries({
                "ATS Compatibility": mockResults.atsCompatibility,
                "Content Quality": mockResults.contentQuality,
                Readability: mockResults.readabilityScore,
                "Keyword Optimization": mockResults.keywordOptimization,
              }).map(([key, value], index) => (
                <motion.li
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-between items-center"
                >
                  <span>{key}:</span>
                  <span className="font-semibold">{value}%</span>
                </motion.li>
              ))}
            </ul>
          </motion.div> */}
        </motion.div>
        {/* <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8"
        >
          <h3 className="text-xl font-semibold mb-4">AI-Powered Suggestions</h3>
          <ul className="space-y-2">
            {mockResults.suggestions.map((suggestion, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start"
              >
                <LightBulbIcon className="h-6 w-6 text-yellow-500 mr-2 flex-shrink-0" />
                <span>{suggestion}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div> */}

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8"
        >
          <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
          {faqs.map((faq, index) => (
            <motion.div key={index} className="mb-4">
              <motion.button
                className="flex justify-between items-center w-full text-left font-medium text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{faq.question}</span>
                <motion.svg
                  animate={{ rotate: openFAQ === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </motion.button>
              <AnimatePresence>
                {openFAQ === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="mt-2 text-gray-600 dark:text-gray-300">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants} className="flex justify-center mt-8">
        <motion.button
          onClick={handleDownloadPDF}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
          Download PDF Report
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isEnhancementModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed z-10 inset-0 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
              ></motion.div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                &#8203;
              </span>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
              >
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      AI-Powered Resume Enhancement
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Here are some AI-generated suggestions to enhance your resume:
                      </p>
                      <ul className="mt-4 text-left list-disc list-inside">
                        <li>Use more action verbs to describe your achievements</li>
                        <li>Quantify your accomplishments with specific metrics</li>
                        <li>Tailor your skills section to match the job description</li>
                        <li>Improve your resume's ATS compatibility by using industry-standard keywords</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <motion.button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    onClick={() => setIsEnhancementModalOpen(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Close
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default ResultsPage

