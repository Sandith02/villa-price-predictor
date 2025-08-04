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
      const response = await axios.post('http://localhost:8000/predict', formData)
      setPrediction(response.data)
    } catch (error) {
      console.error('Prediction error:', error)
      alert('Error getting prediction. Make sure your API is running!')
    } finally {
      setLoading(false)
    }
  }

 return (
  <main className="relative min-h-screen bg-neutral-50 text-neutral-800">
    <div className="relative z-10 mx-auto max-w-xl px-4 py-24">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-light tracking-wide text-neutral-900">
          Villa Price Predictor
        </h1>
        <p className="mt-2 text-base text-neutral-500">
          Special AI-powered rental estimates for villas around Ahangama area
        </p>
      </header>

      {/* Card */}
      <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-xl transition-shadow hover:shadow-2xl">
        <VillaForm onSubmit={handlePredict} loading={loading} />
        <PredictionResult prediction={prediction} />
      </div>
    </div>
  </main>
)

}

export default VillaPredictorPage