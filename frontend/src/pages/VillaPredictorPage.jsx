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
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🏖️ Villa Price Predictor</h1>
          <p className="text-white/80">AI-powered rental price predictions for Ahangama, Sri Lanka</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <VillaForm onSubmit={handlePredict} loading={loading} />
          <PredictionResult prediction={prediction} />
        </div>
      </div>
    </div>
  )
}

export default VillaPredictorPage