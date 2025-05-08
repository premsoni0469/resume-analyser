"use client"

import { useState, useRef, useEffect } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { saveAs } from "file-saver"
import { Document, Packer, Paragraph, HeadingLevel } from "docx"
import { LinkedinFilled } from "@ant-design/icons"
import {
  ArrowDownTrayIcon,
  PlusIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
  SunIcon,
  MoonIcon,
  ClipboardIcon,
} from "@heroicons/react/24/outline"
import axios from "axios"
import { debounce } from "lodash"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { motion } from "framer-motion"

// Import resume templates
import ClassicTemplate from "./resumeTemplates/ClassicTemplate"
import MinimalistTemplate from "./resumeTemplates/MinimalistTemplate"
import CreativeTemplate from "./resumeTemplates/CreativeTemplate"
import CorporateTemplate from "./resumeTemplates/CorporateTemplate"
import ModernTemplate from "./resumeTemplates/ModernTemplate"

const templates = {
  classic: ClassicTemplate,
  minimalist: MinimalistTemplate,
  creative: CreativeTemplate,
  corporate: CorporateTemplate,
  modern: ModernTemplate,
}

const colorSchemes = {
  corporateBlue: {
    primary: "#0047AB",
    secondary: "#6495ED",
    text: "#333333",
    background: "#FFFFFF",
  },
  modernBlack: {
    primary: "#000000",
    secondary: "#333333",
    text: "#FFFFFF",
    background: "#1A1A1A",
  },
  elegantGreen: {
    primary: "#2E8B57",
    secondary: "#3CB371",
    text: "#333333",
    background: "#F0FFF0",
  },
  vibrantOrange: {
    primary: "#FF4500",
    secondary: "#FF7F50",
    text: "#333333",
    background: "#FFFAF0",
  },
  softPurple: {
    primary: "#8A2BE2",
    secondary: "#9370DB",
    text: "#333333",
    background: "#F8F4FF",
  },
}

const fonts = ["Montserrat", "Roboto", "Lato", "Open Sans", "Raleway"]

// Update the resume preview styling in ResumePreview component
const ResumePreview = ({
  data,
  template,
  colorScheme,
  font,
  layout,
  darkMode,
  setActiveTemplate,
  setColorScheme,
  setFont,
  setLayout,
  setDarkMode,
  handleExportPDF,
  handleExportPNG,
}) => {
  const resumeRef = useRef()
  const [zoom, setZoom] = useState(1)

  const handleExportPDFClick = async () => {
    try {
      const canvas = await html2canvas(resumeRef.current, { scale: 2 })
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297)
      pdf.save("resume.pdf")
    } catch (error) {
      console.error("Error exporting PDF:", error)
      alert("Failed to export as PDF. Please try again.")
    }
  }

  const handleExportPNGClick = async () => {
    try {
      const canvas = await html2canvas(resumeRef.current, { scale: 2 })
      canvas.toBlob((blob) => {
        saveAs(blob, "resume.png")
      })
    } catch (error) {
      console.error("Error exporting PNG:", error)
      alert("Failed to export as PNG. Please try again.")
    }
  }

  const TemplateComponent = templates[template] || templates.modern

  const buttonStyles =
    "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200"
  const primaryButtonStyles = `${buttonStyles} text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500`
  const secondaryButtonStyles = `${buttonStyles} text-gray-700 bg-white border-gray-300 hover:bg-gray-50 focus:ring-indigo-500`

  return (
    <div className="space-y-6">
      {/* Preview Controls */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6"
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Resume Preview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <label htmlFor="template" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Template
              </label>
              <select
                id="template"
                name="template"
                value={template}
                onChange={(e) => setActiveTemplate(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                {Object.keys(templates).map((t) => (
                  <option key={t} value={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="colorScheme" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Color Scheme
              </label>
              <select
                id="colorScheme"
                name="colorScheme"
                value={colorScheme}
                onChange={(e) => setColorScheme(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                {Object.keys(colorSchemes).map((scheme) => (
                  <option key={scheme} value={scheme}>
                    {scheme.split(/(?=[A-Z])/).join(" ")}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="font" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Font
              </label>
              <select
                id="font"
                name="font"
                value={font}
                onChange={(e) => setFont(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                {fonts.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="layout" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Layout
              </label>
              <select
                id="layout"
                name="layout"
                value={layout}
                onChange={(e) => setLayout(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="single">Single Column</option>
                <option value="two">Two Columns</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between mt-6">
          
          <div className="flex space-x-2 mt-4 sm:mt-0">
            <button
              onClick={handleExportPDFClick}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
              PDF
            </button>
            <button
              onClick={handleExportPNGClick}
              className="inline-flex items-center px-4 py-2 bg-yellow-600 text-white rounded-md"
            >
              <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
              PNG
            </button>
          </div>
        </div>
      </motion.div>
      {/* Resume Preview Area - Updated styling */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="relative">
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-900 rounded-lg" />
        <div className="relative">
          <div className="overflow-auto max-h-[842px] border border-gray-200 dark:border-gray-700 rounded-lg">
            <motion.div
              ref={resumeRef}
              className={`bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full ${darkMode ? "dark" : ""}`}
              style={{
                fontFamily: font,
                minHeight: "1056px",
                transform: `scale(${zoom})`,
                transformOrigin: "top left",
              }}
            >
              <div className="space-y-6">
                {/* Personal Details */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8"
                >
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {data.personalDetails.name || "Your Name"}
                  </h1>
                  <div className="text-gray-600 dark:text-gray-300 space-y-1">
                    <p>{data.personalDetails.email}</p>
                    <p>{data.personalDetails.phone}</p>
                    <p>{data.personalDetails.location}</p>
                    {data.personalDetails.linkedin && <p>LinkedIn: {data.personalDetails.linkedin}</p>}
                    {data.personalDetails.github && <p>GitHub: {data.personalDetails.github}</p>}
                  </div>
                </motion.div>

                {/* Professional Summary */}
                {data.summary && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                  >
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Professional Summary</h2>
                    <p className="text-gray-700 dark:text-gray-300">{data.summary}</p>
                  </motion.div>
                )}

                {/* Experience */}
                {data.experience.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                  >
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Experience</h2>
                    <div className="space-y-4">
                      {data.experience.map((exp, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="border-b border-gray-200 dark:border-gray-700 pb-4"
                        >
                          <h3 className="font-semibold text-gray-800 dark:text-gray-200">{exp.position}</h3>
                          <p className="text-gray-600 dark:text-gray-400">{exp.company}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {exp.startDate} - {exp.endDate}
                          </p>
                          <p className="mt-2 text-gray-700 dark:text-gray-300">{exp.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Education */}
                {data.education.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                  >
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Education</h2>
                    <div className="space-y-4">
                      {data.education.map((edu, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="border-b border-gray-200 dark:border-gray-700 pb-4"
                        >
                          <h3 className="font-semibold text-gray-800 dark:text-gray-200">{edu.degree}</h3>
                          <p className="text-gray-600 dark:text-gray-400">{edu.institution}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{edu.graduationDate}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Skills */}
                {data.skills.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                  >
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {data.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
                {/* Volunteering */}
                {data.volunteering.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                  >
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Volunteering</h2>
                    <div className="space-y-4">
                      {data.volunteering.map((volunteer, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="border-b border-gray-200 dark:border-gray-700 pb-4"
                        >
                          <h3 className="font-semibold text-gray-800 dark:text-gray-200">{volunteer.name}</h3>
                          <p className="text-gray-600 dark:text-gray-400">{volunteer.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Awards */}
                {data.awards.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                  >
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Awards</h2>
                    <div className="space-y-4">
                      {data.awards.map((award, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="border-b border-gray-200 dark:border-gray-700 pb-4"
                        >
                          <h3 className="font-semibold text-gray-800 dark:text-gray-200">{award.name}</h3>
                          <p className="text-gray-600 dark:text-gray-400">{award.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Publications */}
                {data.publications.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                  >
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Publications</h2>
                    <div className="space-y-4">
                      {data.publications.map((publication, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="border-b border-gray-200 dark:border-gray-700 pb-4"
                        >
                          <h3 className="font-semibold text-gray-800 dark:text-gray-200">{publication.name}</h3>
                          <p className="text-gray-600 dark:text-gray-400">{publication.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Additional Sections */}
                {data.certifications.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                  >
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Certifications</h2>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                      {data.certifications.map((cert, index) => (
                        <li key={index}>{cert.name}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Preview Zoom Controls */}
      <div className="flex justify-center space-x-4 mt-4">
        <button
          onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          -
        </button>
        <span className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={() => setZoom(Math.min(2, zoom + 0.1))}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          +
        </button>
      </div>
    </div>
  )
}

ResumePreview.displayName = "ResumePreview"

const AIResumeBuilder = () => {
  const [resumeData, setResumeData] = useState({
    personalDetails: { name: "", email: "", phone: "", location: "", linkedin: "", github: "" },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    certifications: [],
    volunteering: [],
    awards: [],
    publications: [],
  })
  const [activeTemplate, setActiveTemplate] = useState("classic")
  const [colorScheme, setColorScheme] = useState("corporateBlue")
  const [font, setFont] = useState("Montserrat")
  const [darkMode, setDarkMode] = useState(false)
  const [showSections, setShowSections] = useState({
    certifications: true,
    volunteering: true,
    awards: true,
    publications: true,
  })
  const [layout, setLayout] = useState("single")
  const [jobDescription, setJobDescription] = useState("")
  const [atsScore, setAtsScore] = useState(0)
  const [missingKeywords, setMissingKeywords] = useState([])
  const [badPractices, setBadPractices] = useState([])
  const [aiSuggestions, setAiSuggestions] = useState([])
  const [savedResumes, setSavedResumes] = useState([])
  const [shareableLink, setShareableLink] = useState("")
  const [newSkill, setNewSkill] = useState("")
  const [skillSuggestions, setSkillSuggestions] = useState([])
  const [notification, setNotification] = useState({ message: "", type: "" })

  const resumeRef = useRef(null)

  useEffect(() => {
    const savedResumesData = localStorage.getItem("savedResumes")
    if (savedResumesData) {
      setSavedResumes(JSON.parse(savedResumesData))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("savedResumes", JSON.stringify(savedResumes))
  }, [savedResumes])

  const handleInputChange = (section, index, field, value) => {
    setResumeData((prevData) => {
      const newData = { ...prevData }
      if (Array.isArray(newData[section])) {
        newData[section][index][field] = value
      } else {
        newData[section][field] = value
      }
      return newData
    })
  }

  const handleAddItem = (section) => {
    setResumeData((prevData) => ({
      ...prevData,
      [section]: [
        ...prevData[section],
        section === "experience"
          ? { company: "", position: "", startDate: "", endDate: "", description: "" }
          : section === "education"
            ? { institution: "", degree: "", graduationDate: "" }
            : section === "skills"
              ? { name: "", level: 3 }
              : { name: "", description: "" },
      ],
    }))
  }

  const handleRemoveItem = (section, index) => {
    setResumeData((prevData) => ({
      ...prevData,
      [section]: prevData[section].filter((_, i) => i !== index),
    }))
  }

  const handleExportPDF = async () => {
    try {
      const canvas = await html2canvas(resumeRef.current, { scale: 2 })
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297)
      pdf.save("resume.pdf")
      showNotification("Resume exported as PDF successfully", "success")
    } catch (error) {
      console.error("Error exporting PDF:", error)
      showNotification("Failed to export resume as PDF", "error")
    }
  }

  const handleExportDOCX = () => {
    try {
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              // Personal Details
              new Paragraph({
                text: resumeData.personalDetails.name,
                heading: HeadingLevel.HEADING_1,
              }),
              new Paragraph({
                text: `Email: ${resumeData.personalDetails.email}`,
              }),
              new Paragraph({
                text: `Phone: ${resumeData.personalDetails.phone}`,
              }),
              new Paragraph({
                text: `Location: ${resumeData.personalDetails.location}`,
              }),

              // Summary
              new Paragraph({
                text: "Summary",
                heading: HeadingLevel.HEADING_2,
              }),
              new Paragraph({
                text: resumeData.summary,
              }),

              // Experience
              new Paragraph({
                text: "Experience",
                heading: HeadingLevel.HEADING_2,
              }),
              ...resumeData.experience.flatMap((exp) => [
                new Paragraph({
                  text: `${exp.position} at ${exp.company}`,
                  heading: HeadingLevel.HEADING_3,
                }),
                new Paragraph({
                  text: `${exp.startDate} - ${exp.endDate}`,
                }),
                new Paragraph({
                  text: exp.description,
                }),
              ]),

              // Education
              new Paragraph({
                text: "Education",
                heading: HeadingLevel.HEADING_2,
              }),
              ...resumeData.education.flatMap((edu) => [
                new Paragraph({
                  text: `${edu.degree} - ${edu.institution}`,
                  heading: HeadingLevel.HEADING_3,
                }),
                new Paragraph({
                  text: edu.graduationDate,
                }),
              ]),

              // Skills
              new Paragraph({
                text: "Skills",
                heading: HeadingLevel.HEADING_2,
              }),
              new Paragraph({
                text: resumeData.skills.map((skill) => skill.name).join(", "),
              }),

              // Volunteering
              new Paragraph({
                text: "Volunteering",
                heading: HeadingLevel.HEADING_2,
              }),
              ...resumeData.volunteering.flatMap((volunteer) => [
                new Paragraph({
                  text: volunteer.name,
                  heading: HeadingLevel.HEADING_3,
                }),
                new Paragraph({
                  text: volunteer.description,
                }),
              ]),

              // Awards
              new Paragraph({
                text: "Awards",
                heading: HeadingLevel.HEADING_2,
              }),
              ...resumeData.awards.flatMap((award) => [
                new Paragraph({
                  text: award.name,
                  heading: HeadingLevel.HEADING_3,
                }),
                new Paragraph({
                  text: award.description,
                }),
              ]),

              // Publications
              new Paragraph({
                text: "Publications",
                heading: HeadingLevel.HEADING_2,
              }),
              ...resumeData.publications.flatMap((publication) => [
                new Paragraph({
                  text: publication.name,
                  heading: HeadingLevel.HEADING_3,
                }),
                new Paragraph({
                  text: publication.description,
                }),
              ]),
            ],
          },
        ],
      })

      // Generate and download the DOCX file
      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, "Resume.docx")
      })
    } catch (error) {
      console.error("Error generating DOCX:", error)
    }
  }

  const handleExportPNG = async () => {
    try {
      const canvas = await html2canvas(resumeRef.current, { scale: 2 })
      canvas.toBlob((blob) => {
        saveAs(blob, "resume.png")
        showNotification("Resume exported as PNG successfully", "success")
      })
    } catch (error) {
      console.error("Error exporting PNG:", error)
      showNotification("Failed to export resume as PNG", "error")
    }
  }

  const handleShareResume = () => {
    const resumeId = Math.random().toString(36).substr(2, 9)
    localStorage.setItem(`sharedResume_${resumeId}`, JSON.stringify(resumeData))
    const link = `${window.location.origin}/shared-resume/${resumeId}`
    setShareableLink(link)
    showNotification("Shareable link generated successfully", "success")
  }

  const handleCopyShareableLink = () => {
    navigator.clipboard.writeText(shareableLink)
    showNotification("Shareable link copied to clipboard", "success")
  }

  const handleSaveResume = () => {
    const newSavedResume = {
      id: Date.now(),
      name: `Resume ${savedResumes.length + 1}`,
      data: resumeData,
    }
    setSavedResumes([...savedResumes, newSavedResume])
    showNotification("Resume saved successfully", "success")
  }

  const handleLoadResume = (id) => {
    const loadedResume = savedResumes.find((resume) => resume.id === id)
    if (loadedResume) {
      setResumeData(loadedResume.data)
      showNotification("Resume loaded successfully", "success")
    } else {
      showNotification("Failed to load resume", "error")
    }
  }

  const handleImportLinkedIn = async () => {
    try {
      // This is a mock API call. In a real application, you would integrate with LinkedIn's API
      const response = await axios.get("https://api.mock-linkedin.com/v2/me")
      const linkedInData = response.data
      setResumeData((prevData) => ({
        ...prevData,
        personalDetails: {
          ...prevData.personalDetails,
          name: linkedInData.firstName + " " + linkedInData.lastName,
          email: linkedInData.emailAddress,
          linkedin: linkedInData.vanityName,
        },
        experience: linkedInData.positions.values.map((position) => ({
          company: position.company.name,
          position: position.title,
          startDate: position.startDate.year + "-" + position.startDate.month,
          endDate: position.isCurrent ? "Present" : position.endDate.year + "-" + position.endDate.month,
          description: position.summary,
        })),
        education: linkedInData.educations.values.map((education) => ({
          institution: education.schoolName,
          degree: education.degree,
          graduationDate: education.endDate.year,
        })),
        skills: linkedInData.skills.values.map((skill) => ({
          name: skill.skill.name,
          level: 3, // Default level, as LinkedIn doesn't provide skill levels
        })),
      }))
      showNotification("LinkedIn data imported successfully", "success")
    } catch (error) {
      console.error("Error importing LinkedIn data:", error)
      showNotification("Failed to import LinkedIn data", "error")
    }
  }

  const handleJobDescriptionChange = debounce((value) => {
    setJobDescription(value)
    analyzeJobDescription(value)
  }, 300)

  const analyzeJobDescription = async (description) => {
    try {
      // This is a mock API call. In a real application, you would call your backend or an AI service
      const response = await axios.post("https://api.example.com/analyze-job", { description, resume: resumeData })
      const { atsScore, missingKeywords, badPractices, suggestions } = response.data
      setAtsScore(atsScore)
      setMissingKeywords(missingKeywords)
      setBadPractices(badPractices)
      setAiSuggestions(suggestions)
    } catch (error) {
      console.error("Error analyzing job description:", error)
      showNotification("Failed to analyze job description", "error")
    }
  }

  const handleAddSkill = () => {
    if (newSkill) {
      setResumeData((prevData) => ({
        ...prevData,
        skills: [...prevData.skills, { name: newSkill, level: 3 }],
      }))
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (skillToRemove) => {
    setResumeData((prevData) => ({
      ...prevData,
      skills: prevData.skills.filter((skill) => skill.name !== skillToRemove),
    }))
  }

  const getSkillSuggestions = async (jobTitle) => {
    try {
      // This is a mock API call. In a real application, you would call your backend or an AI service
      const response = await axios.get(`https://api.example.com/skill-suggestions?jobTitle=${jobTitle}`)
      setSkillSuggestions(response.data.skills)
    } catch (error) {
      console.error("Error fetching skill suggestions:", error)
      showNotification("Failed to fetch skill suggestions", "error")
    }
  }

  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: "", type: "" }), 3000)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <motion.div
      
        className={` className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20max-w-7xl mx-auto px-4 sm:px-6 lg:px-44 py-12 ${darkMode ? "dark" : ""}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
  className="text-4xl md:text-5xl font-extrabold mb-6 text-blue-600 bg-clip-text text-center"
  initial={{ y: -20 }}
  animate={{ y: 0 }}
  transition={{ duration: 0.5 }}
>
  Resume Builder
</motion.h1>

        {notification.message && (
          <motion.div
            className={`mb-4 p-4 rounded-md ${
              notification.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {notification.message}
          </motion.div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form Inputs */}
          <div className="space-y-6">
            {/* Personal Details */}
            <motion.div
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Personal Details</h2>
              {Object.keys(resumeData.personalDetails).map((field) => (
                <div key={field} className="mb-4">
                  <label htmlFor={field} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
                    id={field}
                    name={field}
                    value={resumeData.personalDetails[field]}
                    onChange={(e) => handleInputChange("personalDetails", 0, field, e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              ))}
              <button
                onClick={handleImportLinkedIn}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <LinkedinFilled className="mr-2" />
                Import from LinkedIn
              </button>
            </motion.div>

            {/* Skills Section */}
            <motion.div
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Skills</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {resumeData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center"
                  >
                    {skill.name}
                    <button
                      onClick={() => handleRemoveSkill(skill.name)}
                      className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex items-center">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Enter a new skill"
                  className="mt-1 block w-[420px] rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                  onClick={handleAddSkill}
                  className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Skill
                </button>
              </div>
              <button
                onClick={() => getSkillSuggestions(resumeData.personalDetails.jobTitle)}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Get AI Skill Suggestions
              </button>
              {skillSuggestions.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Suggested Skills:</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillSuggestions.map((skill, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setNewSkill(skill)
                          handleAddSkill()
                        }}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold py-1 px-2 rounded-full text-sm"
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Other sections */}
            {["experience", "education", "certifications", "volunteering", "awards", "publications"].map((section) => (
              <motion.div
                key={section}
                className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">{section.charAt(0).toUpperCase() + section.slice(1)}</h2>
                  <button
                    onClick={() => setShowSections({ ...showSections, [section]: !showSections[section] })}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {showSections[section] ? <EyeIcon className="h-5 w-5" /> : <EyeSlashIcon className="h-5 w-5" />}
                  </button>
                </div>
                {showSections[section] && (
                  <div className="space-y-4">
                    {resumeData[section].map((item, index) => (
                      <div key={index} className="border border-gray-200 rounded-md p-4">
                        {Object.keys(item).map((field) => (
                          <div key={field} className="mb-2">
                            <label
                              htmlFor={`${section}-${field}-${index}`}
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                            <input
                              type="text"
                              id={`${section}-${field}-${index}`}
                              name={`${section}-${field}-${index}`}
                              value={item[field]}
                              onChange={(e) => handleInputChange(section, index, field, e.target.value)}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                        ))}
                        <button
                          onClick={() => handleRemoveItem(section, index)}
                          className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <TrashIcon className="h-4 w-4 mr-1" />
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => handleAddItem(section)}
                      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <PlusIcon className="h-5 w-5 mr-2" />
                      Add {section.slice(0, 20)}
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Right Column - Preview */}
          <div className="space-y-6">
            <ResumePreview
              data={resumeData}
              template={activeTemplate}
              colorScheme={colorScheme}
              font={font}
              layout={layout}
              darkMode={darkMode}
              setActiveTemplate={setActiveTemplate}
              setColorScheme={setColorScheme}
              setFont={setFont}
              setLayout={setLayout}
              setDarkMode={setDarkMode}
              handleExportPDF={handleExportPDF}
              handleExportDOCX={handleExportDOCX}
              handleExportPNG={handleExportPNG}
            />
            {/* ATS Optimization */}
            <motion.div
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">ATS Optimization</h2>
              <div className="mb-4">
                <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Job Description
                </label>
                <textarea
                  id="jobDescription"
                  name="jobDescription"
                  rows={4}
                  value={jobDescription}
                  onChange={(e) => handleJobDescriptionChange(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Paste the job description here..."
                />
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">ATS Score: {atsScore}%</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${atsScore}%` }}></div>
                </div>
              </div>
              {missingKeywords.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Missing Keywords:</h3>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                    {missingKeywords.map((keyword, index) => (
                      <li key={index}>{keyword}</li>
                    ))}
                  </ul>
                </div>
              )}
              {badPractices.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Bad Practices:</h3>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                    {badPractices.map((practice, index) => (
                      <li key={index}>{practice}</li>
                    ))}
                  </ul>
                </div>
              )}
              {aiSuggestions.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">AI Suggestions:</h3>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                    {aiSuggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>

            {/* Save and Share */}
            <motion.div
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Save and Share</h2>
              <div className="flex space-x-4">
                <button
                  onClick={handleSaveResume}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Resume
                </button>
                <button
                  onClick={handleShareResume}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Share Resume
                </button>
              </div>
              {shareableLink && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Shareable Link:</p>
                  <div className="flex items-center mt-1">
                    <input
                      type="text"
                      value={shareableLink}
                      readOnly
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <button
                      onClick={handleCopyShareableLink}
                      className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <ClipboardIcon className="h-5 w-5 mr-1" />
                      Copy
                    </button>
                  </div>
                </div>
              )}
              {savedResumes.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Saved Resumes:</h3>
                  <ul className="space-y-2">
                    {savedResumes.map((resume) => (
                      <li key={resume.id} className="flex items-center justify-between">
                        <span>{resume.name}</span>
                        <button
                          onClick={() => handleLoadResume(resume.id)}
                          className="text-sm text-indigo-600 hover:text-indigo-900"
                        >
                          Load
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </DndProvider>
  )
}

export default AIResumeBuilder

