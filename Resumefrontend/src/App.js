"use client"

import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./contexts/ThemeContext"
import { LanguageProvider } from "./contexts/LanguageContext"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import ResultsPage from "./pages/ResultsPage"
import ContactPage from "./pages/ContactPage"
import ServicesPage from "./pages/ServicesPage"
import GetStartedPage from "./pages/GetStartedPage"
import AIResumeBuilder from "./components/AIResumeBuilder"
import CoverLetterGenerator from "./components/CoverLetterGenerator"
import RecruiterDashboardPage from "./pages/RecruiterDashboardPage"
// import RegistrationPage from "./pages/RegistrationPage"
import Footer from "./components/Footer"


function App() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <div className={`flex flex-col min-h-screen ${darkMode ? "dark" : ""}`}>
            <Navbar toggleDarkMode={toggleDarkMode} />
            <main className="flex-grow bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/results" element={<ResultsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/get-started" element={<GetStartedPage />} />
                { <Route path="/airesumebuilder" element={<AIResumeBuilder />} />}
                <Route path="/cover-letter-generator" element={<CoverLetterGenerator />} />
                <Route path="/recruiter-dashboard" element={<RecruiterDashboardPage />} />
                {/* <Route path="/register" element={<RegistrationPage />} /> */}
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App

