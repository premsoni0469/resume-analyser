"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  DocumentTextIcon,
  ChartBarIcon,
  ClockIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ArrowPathIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/solid"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("resumes")
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false)

  const mockResumes = [
    { id: 1, name: "Software Engineer Resume", date: "2023-05-15", score: 85 },
    { id: 2, name: "Product Manager Resume", date: "2023-05-10", score: 78 },
    { id: 3, name: "Data Scientist Resume", date: "2023-05-05", score: 92 },
  ]

  const mockAnalytics = {
    scoreOverTime: [
      { date: "2023-01", score: 65 },
      { date: "2023-02", score: 70 },
      { date: "2023-03", score: 75 },
      { date: "2023-04", score: 80 },
      { date: "2023-05", score: 85 },
    ],
    keywordDensity: [
      { keyword: "JavaScript", count: 10 },
      { keyword: "React", count: 8 },
      { keyword: "Node.js", count: 6 },
      { keyword: "Python", count: 5 },
      { keyword: "SQL", count: 4 },
    ],
    jobMarketFit: [
      { role: "Software Engineer", match: 90 },
      { role: "Full Stack Developer", match: 85 },
      { role: "Frontend Developer", match: 80 },
      { role: "Backend Developer", match: 75 },
      { role: "DevOps Engineer", match: 70 },
    ],
  }

  const mockHistory = [
    { id: 1, name: "Resume v1", date: "2023-04-01", score: 70 },
    { id: 2, name: "Resume v2", date: "2023-04-15", score: 75 },
    { id: 3, name: "Resume v3", date: "2023-05-01", score: 80 },
    { id: 4, name: "Resume v4", date: "2023-05-15", score: 85 },
  ]

  const mockComparisonData = [
    { category: "ATS Compatibility", A: 80, B: 85 },
    { category: "Content Quality", A: 75, B: 80 },
    { category: "Keyword Optimization", A: 70, B: 75 },
    { category: "Readability", A: 85, B: 85 },
    { category: "Overall Score", A: 78, B: 82 },
  ]

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "resumes":
        return (
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Your Resumes</h2>
              <div className="space-y-4">
                {mockResumes.map((resume) => (
                  <div
                    key={resume.id}
                    className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                  >
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{resume.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: {resume.date}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-blue-500">{resume.score}</span>
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                          <TrashIcon className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                          <ArrowPathIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <PlusIcon className="h-5 w-5 mr-2" />
                Create New Resume
              </button>
            </div>
          </div>
        )
      case "analytics":
        return (
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Analytics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Resume Score Over Time</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={mockAnalytics.scoreOverTime}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="score" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Keyword Density</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={mockAnalytics.keywordDensity}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="keyword" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Job Market Fit</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={mockAnalytics.jobMarketFit} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="role" type="category" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="match" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )
      case "history":
        return (
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Resume History</h2>
              <div className="space-y-4">
                {mockHistory.map((version) => (
                  <div
                    key={version.id}
                    className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                  >
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{version.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Date: {version.date}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-blue-500">{version.score}</span>
                      <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <ArrowPathIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => setIsCompareModalOpen(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <DocumentDuplicateIcon className="h-5 w-5 mr-2" />
                  Compare Versions
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Export History
                </button>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Your Dashboard</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">Track and manage your resume analyses</p>
      </motion.div>

      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            className={`flex-1 py-4 px-6 text-center ${
              activeTab === "resumes"
                ? "bg-blue-500 text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("resumes")}
          >
            <DocumentTextIcon className="h-6 w-6 mx-auto mb-2" />
            Resumes
          </button>
          <button
            className={`flex-1 py-4 px-6 text-center ${
              activeTab === "analytics"
                ? "bg-blue-500 text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("analytics")}
          >
            <ChartBarIcon className="h-6 w-6 mx-auto mb-2" />
            Analytics
          </button>
          <button
            className={`flex-1 py-4 px-6 text-center ${
              activeTab === "history"
                ? "bg-blue-500 text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("history")}
          >
            <ClockIcon className="h-6 w-6 mx-auto mb-2" />
            History
          </button>
        </div>

        <div className="p-6">{renderActiveTabContent()}</div>
      </div>

      {isCompareModalOpen && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Compare Resume Versions
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Comparing Resume v3 and Resume v4</p>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart outerRadius={90} data={mockComparisonData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="category" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar name="Resume v3" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                        <Radar name="Resume v4" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                        <Legend />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                  onClick={() => setIsCompareModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardPage

