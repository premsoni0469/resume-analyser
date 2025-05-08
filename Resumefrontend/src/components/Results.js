"use client"
import { useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid"

export default function Results() {
  const location = useLocation()
  const navigate = useNavigate()
  const results = location.state?.results

  if (!results) {
    navigate("/")
    return null
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-extrabold text-gray-900">Resume Analysis Results</h1>
        <div className="mt-4">
          <div className="text-6xl font-bold text-primary">{results.score}%</div>
          <p className="mt-2 text-gray-600">Overall Score</p>
        </div>
      </motion.div>

      <div className="space-y-8">
        {results.sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-white shadow rounded-lg overflow-hidden"
          >
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{section.title}</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">{section.description}</p>
              <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${section.score}%` }}></div>
              </div>
              <div className="mt-1 text-sm text-gray-600">Score: {section.score}%</div>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <dl className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <div key={item.title} className="flex items-start">
                    {item.status === "success" ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5" />
                    ) : (
                      <XCircleIcon className="h-5 w-5 text-yellow-500 mt-0.5" />
                    )}
                    <div className="ml-3">
                      <dt className="text-sm font-medium text-gray-900">{item.title}</dt>
                      <dd className="mt-1 text-sm text-gray-500">{item.description}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-8 flex justify-center gap-4"
      >
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Upload Another Resume
        </button>
        <button
          onClick={() => {
            const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(results, null, 2))}`
            const link = document.createElement("a")
            link.href = jsonString
            link.download = "resume-analysis.json"
            link.click()
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Download Report
        </button>
      </motion.div>
    </div>
  )
}