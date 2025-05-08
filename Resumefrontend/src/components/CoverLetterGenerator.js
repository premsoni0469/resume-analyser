"use client"

import { useState, useRef } from "react"
import { useReactToPrint } from "react-to-print"
import { DocumentTextIcon, PencilIcon, ArrowDownTrayIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"
import { motion } from "framer-motion"

// Import cover letter templates
import ModernTemplate from "./coverLetterTemplates/ModernTemplate"
import ClassicTemplate from "./coverLetterTemplates/ClassicTemplate"
import CreativeTemplate from "./coverLetterTemplates/CreativeTemplate"

const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95 },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
}

const CoverLetterGenerator = () => {
  const [coverLetterData, setCoverLetterData] = useState({
    personalDetails: { name: "", email: "", phone: "", location: "" },
    recipientDetails: { name: "", company: "", address: "" },
    letterContent: {
      opening: "",
      body: "",
      closing: "",
    },
    jobDescription: "",
  })

  const [activeTemplate, setActiveTemplate] = useState("modern")
  const [theme, setTheme] = useState("light")
  const [view, setView] = useState("form")

  const coverLetterRef = useRef()

  const handlePrint = useReactToPrint({
    content: () => coverLetterRef.current,
    onError: (error) => {
      console.error("Error printing:", error)
      alert("Failed to print. Please try again.")
    },
  })

  const handleInputChange = (section, field, value) => {
    setCoverLetterData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }))
  }

  const generateAICoverLetter = async () => {
    // This is a placeholder for AI-generated content
    // In a real application, you would call an AI API here
    const aiGeneratedContent = `Dear ${coverLetterData.recipientDetails.name},

I am writing to express my strong interest in the [Job Title] position at ${coverLetterData.recipientDetails.company}. With my background in [relevant field] and passion for [industry/company focus], I believe I would be a valuable addition to your team.

[AI-generated paragraph based on job description and personal details]

Thank you for considering my application. I look forward to the opportunity to discuss how I can contribute to ${coverLetterData.recipientDetails.company}'s success.

Sincerely,
${coverLetterData.personalDetails.name}`

    setCoverLetterData((prevData) => ({
      ...prevData,
      letterContent: {
        opening: aiGeneratedContent.split("\n\n")[0],
        body: aiGeneratedContent.split("\n\n")[1],
        closing: aiGeneratedContent.split("\n\n")[2] + "\n\n" + aiGeneratedContent.split("\n\n")[3],
      },
    }))
  }

  const handleDownloadPDF = async () => {
    try {
      const content = coverLetterRef.current
      const canvas = await html2canvas(content, {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
      })
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)

      const imgX = (pdfWidth - imgWidth * ratio) / 2
      const imgY = 30

      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio)
      pdf.save("cover_letter.pdf")
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Failed to generate PDF. Please try again.")
    }
  }

  const renderForm = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Personal Details</h3>
        <div className="mt-2 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          {Object.keys(coverLetterData.personalDetails).map((field) => (
            <div key={field} className="sm:col-span-3">
              <label htmlFor={field} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                name={field}
                id={field}
                value={coverLetterData.personalDetails[field]}
                onChange={(e) => handleInputChange("personalDetails", field, e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recipient Details</h3>
        <div className="mt-2 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          {Object.keys(coverLetterData.recipientDetails).map((field) => (
            <div key={field} className="sm:col-span-3">
              <label htmlFor={field} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                name={field}
                id={field}
                value={coverLetterData.recipientDetails[field]}
                onChange={(e) => handleInputChange("recipientDetails", field, e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Job Description</h3>
        <div className="mt-2">
          <textarea
            id="jobDescription"
            name="jobDescription"
            rows={4}
            value={coverLetterData.jobDescription}
            onChange={(e) => handleInputChange("jobDescription", "jobDescription", e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Paste the job description here..."
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Letter Content</h3>
        <div className="mt-2 space-y-4">
          {Object.keys(coverLetterData.letterContent).map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                {field}
              </label>
              <textarea
                id={field}
                name={field}
                rows={field === "body" ? 6 : 3}
                value={coverLetterData.letterContent[field]}
                onChange={(e) => handleInputChange("letterContent", field, e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={generateAICoverLetter}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Generate AI Cover Letter
        </button>
      </div>
    </div>
  )

  const getTemplateComponent = () => {
    switch(activeTemplate) {
      case "modern":
        return ModernTemplate
      case "classic":
        return ClassicTemplate
      case "creative":
        return CreativeTemplate
      default:
        return ModernTemplate
    }
  }

  const renderPreview = () => {
    const TemplateComponent = getTemplateComponent()
    return (
      <div ref={coverLetterRef} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <TemplateComponent data={coverLetterData} theme={theme} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-8">
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-blue-600 bg-clip-text text-transparent">
            Cover Letter Generator
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Create professional cover letters tailored to your job applications
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-between mb-8">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setView(view === "form" ? "preview" : "form")}
              className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {view === "form" ? (
                <>
                  <DocumentTextIcon className="mr-2 h-5 w-5" />
                  Preview
                </>
              ) : (
                <>
                  <PencilIcon className="mr-2 h-5 w-5" />
                  Edit
                </>
              )}
            </motion.button>

            <div className="flex space-x-4">
              {/* Template selector and other controls with enhanced styling */}
              <select
    value={activeTemplate}
    onChange={(e) => setActiveTemplate(e.target.value)}
    className="px-5 py-3 rounded-xl bg-white text-gray-900 border border-gray-200 shadow-lg focus:ring-2 focus:ring-indigo-500 transition-all duration-300 w-52"
  >
    <option value="modern">Modern Template</option>
    <option value="classic">Classic Template</option>
    <option value="creative">Creative Template</option>
  </select>
              

              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleDownloadPDF}
                className="inline-flex items-center px-6 py-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ArrowDownTrayIcon className="mr-2 h-5 w-5" />
                Download PDF
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl backdrop-blur-lg border border-gray-200 dark:border-gray-700 p-8"
          >
            {view === "form" ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Personal Details</h3>
                  <div className="mt-2 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    {Object.keys(coverLetterData.personalDetails).map((field) => (
                      <div key={field} className="sm:col-span-3">
                        <label htmlFor={field} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          {field.charAt(0).toUpperCase() + field.slice(1)}
                        </label>
                        <input
                          type="text"
                          name={field}
                          id={field}
                          value={coverLetterData.personalDetails[field]}
                          onChange={(e) => handleInputChange("personalDetails", field, e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recipient Details</h3>
                  <div className="mt-2 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    {Object.keys(coverLetterData.recipientDetails).map((field) => (
                      <div key={field} className="sm:col-span-3">
                        <label htmlFor={field} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          {field.charAt(0).toUpperCase() + field.slice(1)}
                        </label>
                        <input
                          type="text"
                          name={field}
                          id={field}
                          value={coverLetterData.recipientDetails[field]}
                          onChange={(e) => handleInputChange("recipientDetails", field, e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Job Description</h3>
                  <div className="mt-2">
                    <textarea
                      id="jobDescription"
                      name="jobDescription"
                      rows={4}
                      value={coverLetterData.jobDescription}
                      onChange={(e) => handleInputChange("jobDescription", "jobDescription", e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Paste the job description here..."
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Letter Content</h3>
                  <div className="mt-2 space-y-4">
                    {Object.keys(coverLetterData.letterContent).map((field) => (
                      <div key={field}>
                        <label
                          htmlFor={field}
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize"
                        >
                          {field}
                        </label>
                        <textarea
                          id={field}
                          name={field}
                          rows={field === "body" ? 6 : 3}
                          value={coverLetterData.letterContent[field]}
                          onChange={(e) => handleInputChange("letterContent", field, e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={generateAICoverLetter}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Generate AI Cover Letter
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8"
              >
                <div ref={coverLetterRef} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                  {(() => {
                    const TemplateComponent = getTemplateComponent();
                    return TemplateComponent && <TemplateComponent data={coverLetterData} theme={theme} />;
                  })()}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default CoverLetterGenerator
