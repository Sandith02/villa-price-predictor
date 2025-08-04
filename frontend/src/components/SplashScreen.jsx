import { useEffect, useState } from 'react'

const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => onComplete(), 1000) // Small delay before transitioning
          return 100
        }
        return prev + 2
      })
    }, 30) // Progress updates every 30ms

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
      {/* Logo and Brand */}
      <div className="text-center mb-8">
        <div className="mb-6">
          <img 
            src="/navlogo.png" 
            alt="VillaPredict Logo" 
            className="h-24 w-auto mx-auto mb-4"
          />
          <h1 className="text-4xl font-bold text-black mb-2">VWizzzard</h1>
          <p className="text-lg text-gray-600">AI-Powered Villa Pricing</p>
        </div>
        
        {/* Loading Animation */}
        {/* <div className="flex items-center justify-center mb-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#fec729]"></div>
          <span className="ml-3 text-gray-600">Loading...</span>
        </div> */}

        {/* Progress Bar */}
        <div className="w-30 bg-gray-200 rounded-full h-0.5 mx-auto">
          <div 
            className="bg-[#fec729] h-0.5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        {/* <p className="text-sm text-gray-500 mt-2">{progress}%</p> */}
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 text-center">
        <p className="text-xs text-gray-400">
            © 2025 VWizzzard. All rights reserved. Developed by GLAMOUR Tech.
        </p>
      </div>
    </div>
  )
}

export default SplashScreen