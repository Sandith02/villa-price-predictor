const PredictionResult = ({ prediction }) => {
  if (!prediction) return null

  return (
    <div className="mt-8 p-6 bg-gradient-to-r from-[#191919] to-[#191919] rounded-xl text-white">
      <h3 className="text-2xl font-bold mb-2">🪙 Predicted Price</h3>
      <p className="text-3xl font-bold">${prediction.predicted_price}/night</p>
      <p className="text-sm opacity-90 mt-2">
        Based on {prediction.villa_features.bedrooms} bedrooms, {prediction.villa_features.beach_distance_m}m from beach
      </p>
      
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="opacity-80">Pool:</span> {prediction.villa_features.pool}
        </div>
        <div>
          <span className="opacity-80">Ocean View:</span> {prediction.villa_features.ocean_view}
        </div>
        <div>
          <span className="opacity-80">Garden:</span> {prediction.villa_features.garden_size}
        </div>
        <div>
          <span className="opacity-80">WiFi:</span> {prediction.villa_features.wifi_quality}
        </div>
      </div>
    </div>
  )
}

export default PredictionResult