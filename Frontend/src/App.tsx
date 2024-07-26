import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [result, setResult] = useState({
    label: '',
    percentage: 0,
  });

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setImageUrl(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await axios.post('http://127.0.0.1:8080/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Chest X-ray Pneumonia Detection</h1>
          <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Upload</button>
          </form>
          {imageUrl && (
            <div>
              <img src={imageUrl} alt="Uploaded X-ray" style={{ width: '300px', height: '100%', marginTop: '20px' }} />
            </div>
          )}
          {result && (
            <div>
              <h2>Prediction: {result.label}</h2>
              <p>Confidence: {result.percentage < 50 ? (100 - result.percentage).toFixed(2) : result.percentage.toFixed(2)}%</p>
            </div>
          )}
        </header>
      </div>
    </>
  );
}

export default App;
