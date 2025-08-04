import { useState } from 'react'
import axios from 'axios'
import VillaForm from '../components/VillaForm'
import PredictionResult from '../components/PredictionResult'

const VillaPredictorPage = () => {
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)

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
    <main className="min-h-screen bg-neutral-50 text-neutral-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto px-6 py-20">
        {/* Left Side: Text + Form */}
        <div className="flex flex-col justify-center">
          <header className="mb-10">
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-neutral-900 mb-4">
              Villa Price Predictor
            </h1>
            <p className="text-lg text-neutral-500">
            AI-powered rental estimates for villas around the Ahangama area.
            </p>
          </header>

          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-lg">
            <VillaForm onSubmit={handlePredict} loading={loading} />
            <PredictionResult prediction={prediction} />
          </div>
        </div>

        {/* Right Side: Empty for now – you can add an image or visual here */}
        <div className="flex items-center justify-center">
          {/* Example placeholder – you can replace with your image */}
          <div className="w-full h-100 md:h-full flex items-center justify-center text-neutral-400">
            {/* Replace below with <img src="..." alt="..." className="w-full h-full object-cover rounded-2xl" /> */}
            <img
                src="set4@2x-8.png"
                alt="Luxury villa"
                className="w-full h-100 "
            />
          </div>
        </div>
      </div>
    </main>
  )
}

export default VillaPredictorPage