"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.5,
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

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSubmitStatus("success")
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus(null), 3000)
    }
  }

  return (
    <div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: 20 }}
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div variants={containerVariants} className="space-y-16">
          <div variants={itemVariants} className="text-center">
            <h1
              className="text-4xl md:text-5xl font-extrabold mb-6 text-blue-600 bg-clip-text"
              animate={{
                backgroundPosition: ["0%", "100%"],
                transition: { duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
              }}
            >
              Contact Us
            </h1>
            <p
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              We're here to help. Reach out to us for any questions or support.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div variants={itemVariants}>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div
                  className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-8 shadow-xl backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="space-y-6">
                    {["name", "email", "message"].map((field, index) => (
                      <div
                        key={field}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <label
                          htmlFor={field}
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          {field.charAt(0).toUpperCase() + field.slice(1)}
                        </label>
                        {field === "message" ? (
                          <textarea
                            id={field}
                            name={field}
                            rows="4"
                            value={formData[field]}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl bg-white light:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                          />
                        ) : (
                          <input
                            type={field === "email" ? "email" : "text"}
                            id={field}
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl bg-white light:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-6" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full inline-flex justify-center items-center px-6 py-3 rounded-xl text-white bg-blue-500 font-medium shadow-lg transition-all duration-300
                        ${
                          isSubmitting
                            ? "bg-blue-400 cursor-not-allowed"
                            : "to-blue-400 hover:bg-blue-700"
                        }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </div>
                  <AnimatePresence>
                    {submitStatus && (
                      <div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className={`mt-4 p-4 rounded-lg ${
                          submitStatus === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}
                      >
                        {submitStatus === "success" ? (
                          <p
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          >
                            Message sent successfully!
                          </p>
                        ) : (
                          <p
                            initial={{ x: 0 }}
                            animate={{ x: [-10, 10, -10, 10, 0] }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          >
                            Failed to send message. Please try again.
                          </p>
                        )}
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </div>

            <div variants={itemVariants} className="space-y-8">
              <div
                className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-8 shadow-xl backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Contact Information</h2>
                <div className="space-y-6">
                  {[
                    { Icon: MapPinIcon, text: "Mumbai" },
                    { Icon: PhoneIcon, text: "+91 816-9961832" },
                    { Icon: EnvelopeIcon, text: "support@resumeanalyzer.ai" },
                  ].map(({ Icon, text }, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4"
                      whileHover={{ scale: 1.05, originX: 0 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex-shrink-0">
                        <Icon className="h-6 w-6 text-blue-500" />
                      </div>
                      <span className="text-gray-600 dark:text-gray-300">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage

