'use client'

import Image from 'next/image'
import { useState } from 'react'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

// Set the PDF Make fonts
pdfMake.vfs = pdfFonts.pdfMake.vfs

export default function Home() {
  const [file, setFile] = useState(null)
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')

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
      setPrediction(data.prediction === 1 ? 'Pneumonia' : 'Normal')
    } catch (error) {
      setError('An error occurred while processing the prediction.')
    }

    setLoading(false)
  }

  const handleDownload = () => {
    setShowForm(true)
  }

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Convert file to base64
    let fileBase64 = '';
    if (file) {
      fileBase64 = await getBase64(file);
    }

    // Create PDF document definition
    const docDefinition = {
      content: [
        {
          text: `Patient Report\nName: ${name}\nMobile: ${mobile}\nPrediction: ${prediction}`,
          margin: [0, 20],
        },
        // Only include the image if it's available
        ...(file ? [{
          image: fileBase64,
          width: 400,
          height: 400,
        }] : []),
      ],
    };

    try {
      // Create PDF and trigger download
      pdfMake.createPdf(docDefinition).download('report.pdf');
      setShowForm(false);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setError('An error occurred while generating the PDF.');
    }
  };

  return (
    <div className="form-container">
      <div className="left-side">
        <Image src="/sample-xray.png" alt="Sample X-ray" width={400} height={400} className="sample-image" />
      </div>
      <div className="right-side">
        <form onSubmit={handleSubmit} className="upload-form">
          <h1>Upload Chest X-ray</h1>
          <input type="file" id="file-upload" onChange={handleFileChange} />
          <label htmlFor="file-upload" className="form-input-label">
            {file ? file.name : 'Choose an image to upload'}
          </label>
          <button type="submit" disabled={loading}>
            {loading ? 'Uploading...' : 'Upload and Predict'}
          </button>
          {loading && <p>Loading...</p>}
          {prediction !== null && (
            <div>
              <p>Prediction: {prediction}</p>
              <button onClick={handleDownload} className="btn btn-download">
                Download Your Report
              </button>
            </div>
          )}
          {error && (
            <div className="error">
              <p>{error}</p>
            </div>
          )}
        </form>
        {showForm && (
          <form onSubmit={handleFormSubmit} className="user-info-form">
            <h2>Enter Your Details</h2>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
            <button type="submit">Generate Report</button>
          </form>
        )}
      </div>
    </div>
  )
}
