'use client'

import { useState } from 'react'

export default function Upload() {
  const [file, setFile] = useState(null)
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleFileChange = (event) => {
    setFile(event.target.files[0])
    setPrediction(null)
    setError(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!file) return

    setLoading(true)
    setPrediction(null)
    setError(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('http://127.0.0.1:5000/api/predict', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('API response:', data) // Debugging log
      setPrediction(data.prediction)
    } catch (error) {
      console.error('Error:', error)
      setError('An error occurred while processing the prediction.')
    }

    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="file" onChange={handleFileChange} className="file-input" />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload and Predict'}
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {prediction !== null && (
        <div className="mt-4">
          <p>
            {prediction === 1
              ? 'Pneumonia detected'
              : prediction === 0
              ? 'No pneumonia detected'
              : 'Prediction result is not recognized'}
          </p>
        </div>
      )}
      {error && (
        <div className="mt-4 text-red-500">
          <p>{error}</p>
        </div>
      )}
    </div>
  )
}
