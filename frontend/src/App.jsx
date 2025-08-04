import { useState, useEffect } from 'react'
import VillaPredictorPage from './pages/VillaPredictorPage'
import SplashScreen from './components/SplashScreen'

function App() {
  const [showSplash, setShowSplash] = useState(true)

  const handleSplashComplete = () => {
    setShowSplash(false)
  }

  return (
    <div className="App">
      {showSplash ? (
        <SplashScreen onComplete={handleSplashComplete} />
      ) : (
        <VillaPredictorPage />
      )}
    </div>
  )
}

export default App