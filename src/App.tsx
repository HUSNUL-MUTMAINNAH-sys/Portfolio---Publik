import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ScrollProgressBar from './components/ScrollProgressBar'
import MouseFollower from './components/MouseFollower'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import FeaturedProjects from './components/FeaturedProjects'
import ProjectGallery from './components/ProjectGallery'
import Experience from './components/Experience'
import Achievements from './components/Achievements'
import TechStack from './components/TechStack'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-ink text-ink dark:text-white selection:bg-accent selection:text-white">
      <LoadingScreen show={loading} />
      <ScrollProgressBar />
      <MouseFollower />
      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Hero />
        <About />
        <Skills />
        <FeaturedProjects />
        <ProjectGallery />
        <Experience />
        <Achievements />
        <TechStack />
        <Contact />
        <Footer />
      </motion.main>
    </div>
  )
}
