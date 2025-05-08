"use client"

import { useState, useEffect } from "react"
import { motion, useAnimation, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { DocumentTextIcon, ChartBarIcon, AcademicCapIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { useInView } from "react-intersection-observer"

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: {
      duration: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
  hover: {
    scale: 1.05,
    rotateX: 5,
    rotateY: 5,
    transition: { duration: 0.3 },
  },
}

const floatingAnimation = {
  y: ["-2%", "2%"],
  transition: {
    y: {
      duration: 2,
      yoyo: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
}

const ServicesPage = () => {
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const services = [
    {
      title: "Resume Analysis",
      description: "Get a comprehensive analysis of your resume with AI-powered insights and recommendations.",
      icon: DocumentTextIcon,
      category: "analysis",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      title: "Career Coaching",
      description: "One-on-one sessions with experienced career coaches to guide your professional journey.",
      icon: AcademicCapIcon,
      category: "coaching",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Interview Preparation",
      description: "Practice interviews with AI and receive feedback to improve your performance.",
      icon: ChartBarIcon,
      category: "preparation",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      title: "Job Market Analysis",
      description: "Get insights into job market trends and opportunities in your field.",
      icon: ChartBarIcon,
      category: "analysis",
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "LinkedIn Profile Optimization",
      description: "Enhance your LinkedIn profile to attract recruiters and opportunities.",
      icon: DocumentTextIcon,
      category: "optimization",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      title: "Salary Negotiation Training",
      description: "Learn effective strategies for negotiating your salary and benefits.",
      icon: AcademicCapIcon,
      category: "coaching",
      gradient: "from-rose-500 to-pink-500",
    },
  ]

  const filteredServices = services.filter(
    (service) =>
      (filter === "all" || service.category === filter) &&
      service.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const Card = ({ service }) => {
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const rotateX = useTransform(y, [-100, 100], [30, -30])
    const rotateY = useTransform(x, [-100, 100], [-30, 30])

    return (
      <motion.div
        style={{ x, y, rotateX, rotateY, z: 100 }}
        drag
        dragElastic={0.16}
        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        whileHover="hover"
        variants={cardVariants}
        className="relative group cursor-pointer"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"
          style={{
            background: `linear-gradient(to bottom right, ${service.gradient.split(" ")[1]}, ${
              service.gradient.split(" ")[3]
            })`,
          }}
          animate={{
            background: [
              `linear-gradient(to bottom right, ${service.gradient.split(" ")[1]}, ${service.gradient.split(" ")[3]})`,
              `linear-gradient(to bottom right, ${service.gradient.split(" ")[3]}, ${service.gradient.split(" ")[1]})`,
            ],
          }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />
        <motion.div className="relative bg-white/90 dark:bg-gray-800/90 rounded-2xl p-8 shadow-xl backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 h-full transform transition-all duration-300 hover:shadow-2xl">
          <motion.div
            className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${service.gradient} mb-6`}
            animate={floatingAnimation}
          >
            <service.icon className="h-6 w-6 text-white" />
          </motion.div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{service.title}</h3>
          <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      exit="exit"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20"
      style={{
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div variants={containerVariants} className="space-y-16">
          <motion.div variants={itemVariants} className="text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-extrabold mb-6 text-blue-600 bg-clip-text"
              animate={{
                backgroundPosition: ["0%", "100%"],
                transition: { duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
              }}
            >
              Our Services
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Comprehensive solutions to boost your career and land your dream job.
            </motion.p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <motion.input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 w-full sm:w-80 rounded-xl bg-white/80 light:bg-gray-800/80 border border-gray-400 dark:border-gray-700/50 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                whileFocus={{
                  boxShadow: "0 0 0 3px rgba(124, 58, 237, 0.5)",
                }}
              />
            </motion.div>
            <motion.div className="relative">
              <motion.select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-5 py-3 rounded-xl bg-white text-gray-900 border border-gray-400 focus:ring-2 focus:ring-blue-500 transition-all duration-300 w-52 appearance-none"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <option value="all">All Services</option>
                <option value="analysis">Analysis</option>
                <option value="coaching">Coaching</option>
                <option value="preparation">Preparation</option>
                <option value="optimization">Optimization</option>
              </motion.select>
            </motion.div>
          </motion.div>

          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredServices.map((service, index) => (
                <Card key={service.title} service={service} />
              ))}
            </AnimatePresence>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center space-y-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "AI-Powered Analysis",
                  description: "Cutting-edge AI technology for accurate and insightful resume analysis.",
                },
                {
                  title: "Expert Career Advice",
                  description: "Guidance from experienced professionals in various industries.",
                },
                {
                  title: "Personalized Approach",
                  description: "Tailored solutions to meet your unique career goals and challenges.",
                },
                {
                  title: "Continuous Support",
                  description: "Ongoing assistance throughout your job search and career journey.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(124, 58, 237, 0.5)",
                  }}
                  className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-xl shadow-lg backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ServicesPage

