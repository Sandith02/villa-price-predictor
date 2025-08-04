import { useState } from 'react'
import axios from 'axios'
import VillaForm from '../components/VillaForm'
import PredictionResult from '../components/PredictionResult'

const VillaPredictorPage = () => {
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handlePredict = async (formData) => {
    setLoading(true)
   
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
      const response = await axios.post(`${API_URL}/predict`, formData)
      setPrediction(response.data)
    } catch (error) {
      console.error('Prediction error:', error)
      alert('Error getting prediction. Make sure your API is running!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Navigation */}
      <nav className="bg-white ">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img 
                src="/navlogo.png" 
                alt="VillaPredict Logo" 
                className="h-10 w-auto"
              />
              <span className="text-2xl font-semibold text-black">VWizzzard</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden font-regular md:flex space-x-8">
              <a href="#home" className="text-black hover:text-[#fec729] transition-colors">Home</a>
              <a href="#about" className="text-black hover:text-[#fec729] transition-colors">About</a>
              <a href="#contact" className="text-black hover:text-[#fec729] transition-colors">Contact</a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <a href="#home" className="block py-2 text-black hover:text-[#fec729]">Home</a>
              <a href="#about" className="block py-2 text-black hover:text-[#fec729]">About</a>
              <a href="#contact" className="block py-2 text-black hover:text-[#fec729]">Contact</a>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main id="home" className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Side: Text + Form */}
          <div className="flex flex-col justify-center">
            <header className="mb-10">
              <h1 className="text-4xl md:text-5xl font-regular tracking-tight text-black mb-4">
                Villa Price Predictor
              </h1>
              <p className="text-lg text-gray-600">
                AI-powered rental estimates for villas around the Ahangama area.
              </p>
            </header>
            
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg">
              <VillaForm onSubmit={handlePredict} loading={loading} />
              <PredictionResult prediction={prediction} />
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="flex items-center justify-center">
            <div className="w-full">
              <img
                src="set4@2x-8.png"
                alt="Luxury villa"
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </div>
        </div>
      </main>

      {/* About Section */}
      <section id="about" className=" py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-black mb-6">About VWizzzard</h2>
          <p className="text-lg text-gray-600 mb-8">
            VWizzzard uses advanced AI technology to provide accurate rental price estimates 
            for villas in the beautiful Ahangama area of Sri Lanka. Our machine learning model 
            is trained on real market data from 50+ verified properties, considering factors 
            like location, amenities, and seasonal trends.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-2xl font-semibold text-[#fec729] mb-2">45+</div>
              <div className="text-gray-600">Villas Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-[#fec729] mb-2">85%+</div>
              <div className="text-gray-600">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-[#fec729] mb-2">Instant</div>
              <div className="text-gray-600">Predictions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-black mb-6">Contact Us</h2>
          <p className="text-lg text-gray-600 mb-8">
            Have questions about villa pricing or want to learn more about our hosting services? 
            We'd love to hear from you.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-black mb-2">General Inquiries</h3>
              <p className="text-gray-600">lthenuwara@gmail.com</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-black mb-2">GLAMOUR Co.</h3>
              <p className="text-gray-600">+94 76 692 6418</p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-[] text-white py-8">
        <div className="max-w-4xl  mx-auto px-6 text-center">
          <p className="text-[#191919]">
            © 2025 VWizzzard. All rights reserved. Developed by GLAMOUR Tech.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default VillaPredictorPage