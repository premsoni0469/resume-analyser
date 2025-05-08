"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { useTheme } from "../contexts/ThemeContext"
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline"
import cvIcon from "../images/curriculum-vitae.png"
import i18next from "i18next"
import { initReactI18next, useTranslation } from "react-i18next"

// Initialize i18next
i18next.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        home: "Home",
        about: "About",
        aiResumeBuilder: "Resume Builder",
        coverLetter: "Cover Letter",
        recruiterDashboard: "Recruiter Dashboard",
        services: "Services",
        contact: "Contact",
        // language: "Language",
        // english: "English",
        // spanish: "Español",
        // french: "Français",
      },
    },
    // es: {
    //   translation: {
    //     home: "Inicio",
    //     about: "Acerca de",
    //     aiResumeBuilder: "Constructor de CV IA",
    //     coverLetter: "Carta de Presentación",
    //     recruiterDashboard: "Panel del Reclutador",
    //     services: "Servicios",
    //     contact: "Contacto",
    //     language: "Idioma",
    //     english: "English",
    //     spanish: "Español",
    //     french: "Français",
    //   },
    // },
    // fr: {
    //   translation: {
    //     home: "Accueil",
    //     about: "À propos",
    //     aiResumeBuilder: "Créateur de CV IA",
    //     coverLetter: "Lettre de Motivation",
    //     recruiterDashboard: "Tableau de Bord Recruteur",
    //     services: "Services",
    //     contact: "Contact",
    //     language: "Langue",
    //     english: "English",
    //     spanish: "Español",
    //     french: "Français",
    //   },
    // },
  },
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
})

const navVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30,
      duration: 0.5,
    },
  },
}

const linkVariants = {
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17,
    },
  },
}

const Navbar = ({ toggleDarkMode }) => {
  const { theme } = useTheme()
  const { t, i18n } = useTranslation()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Initialize language from localStorage or default to 'en'
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en"
    i18n.changeLanguage(savedLanguage)
  }, [i18n])

  const handleLanguageChange = (e) => {
    const newLang = e.target.value
    i18n.changeLanguage(newLang)
    localStorage.setItem("language", newLang)
  }

  const navLinks = [
    { to: "/", text: t("home") },
    { to: "/about", text: t("about") },
    { to: "/airesumebuilder", text: t("aiResumeBuilder") },
    { to: "/cover-letter-generator", text: t("coverLetter") },
    { to: "/recruiter-dashboard", text: t("recruiterDashboard") },
    { to: "/services", text: t("services") },
    { to: "/contact", text: t("contact") },
  ]

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="sticky top-0 z-50 backdrop-blur-lg border-b border-gray-200/20 dark:border-gray-800/20 shadow-lg bg-white/80 dark:bg-gray-900/80 transition-all duration-300 ease-in-out"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="flex items-center transition-transform duration-200 ease-in-out"
        >
          <Link to="/" className="flex-shrink-0">
            <img className="h-10 w-10" src={cvIcon || "/placeholder.svg"} alt="Logo" />
          </Link>
        </motion.div>

        <div className="hidden md:flex items-center space-x-1">
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {navLinks.map((link) => (
                <motion.div key={link.to} variants={linkVariants} whileHover="hover">
                  <Link
                    to={link.to}
                    className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-all duration-200 ease-in-out transform hover:scale-105"
                  >
                    {link.text}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleDarkMode}
            className="p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 ease-in-out transform hover:scale-105"
          >
            {theme === "dark" ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
          </motion.button>
        </div>
    </motion.nav>
  )
}

export default Navbar

