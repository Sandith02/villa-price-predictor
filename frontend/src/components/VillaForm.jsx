import { useState } from 'react'

const VillaForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    bedrooms: 2,
    bathrooms: 1,
    beach_distance_m: 100,
    pool: 'No',
    ocean_view: 'No',
    garden_size: 'Medium',
    ac_rooms: 1,
    wifi_quality: 'Good'
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'bedrooms' || name === 'bathrooms' || name === 'beach_distance_m' || name === 'ac_rooms' 
        ? parseInt(value) 
        : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Bedrooms */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">Bedrooms</label>
        <select 
          name="bedrooms" 
          value={formData.bedrooms} 
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {[1,2,3,4,5].map(num => (
            <option key={num} value={num}>{num} Bedroom{num > 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>

      {/* Bathrooms */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">Bathrooms</label>
        <select 
          name="bathrooms" 
          value={formData.bathrooms} 
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {[1,2,3,4,5].map(num => (
            <option key={num} value={num}>{num} Bathroom{num > 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>

      {/* Beach Distance */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">Distance to Beach (meters)</label>
        <input 
          type="number" 
          name="beach_distance_m" 
          value={formData.beach_distance_m} 
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., 100"
        />
      </div>

      {/* AC Rooms */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">AC Rooms</label>
        <select 
          name="ac_rooms" 
          value={formData.ac_rooms} 
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {[0,1,2,3,4,5].map(num => (
            <option key={num} value={num}>{num} AC Room{num !== 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>

      {/* Pool */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">Swimming Pool</label>
        <select 
          name="pool" 
          value={formData.pool} 
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="No">No Pool</option>
          <option value="Yes">Has Pool</option>
        </select>
      </div>

      {/* Ocean View */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">Ocean View</label>
        <select 
          name="ocean_view" 
          value={formData.ocean_view} 
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="No">No Ocean View</option>
          <option value="Yes">Ocean View</option>
        </select>
      </div>

      {/* Garden Size */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">Garden Size</label>
        <select 
          name="garden_size" 
          value={formData.garden_size} 
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="Small">Small Garden</option>
          <option value="Medium">Medium Garden</option>
          <option value="Large">Large Garden</option>
        </select>
      </div>

      {/* WiFi Quality */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">WiFi Quality</label>
        <select 
          name="wifi_quality" 
          value={formData.wifi_quality} 
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="Average">Average WiFi</option>
          <option value="Good">Good WiFi</option>
          <option value="Excellent">Excellent WiFi</option>
        </select>
      </div>

      {/* Submit Button */}
      <div className="md:col-span-2">
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition duration-300 disabled:opacity-50"
        >
          {loading ? '🤖 Predicting...' : '🔮 Predict Villa Price'}
        </button>
      </div>
    </form>
  )
}

export default VillaForm