import axios from "axios";
import { useState } from "react";

const Home = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [result, setResult] = useState<{ label: string; percentage: number }>({
    label: '',
    percentage: 0,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      setImageUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    <header
      className="App-header"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '50px',
      }}
    >
      <h1>Chest X-ray Pneumonia Detection</h1>
      <form onSubmit={handleSubmit}>
        <input className="" type="file" onChange={handleFileChange} onClick={() =>
          setResult({
            label: '',
            percentage: 0,
          })
        } />
        <br />
        {imageUrl && (
          <>
            <div>
              <img src={imageUrl} alt="Uploaded X-ray" style={{ width: '400px', height: '100%', marginTop: '20px' }} />
            </div>
            <br />
            <button className="btn btn-primary" type="submit">Upload</button>
          </>
        )}
      </form>
      {result.label && (
        <div>
          <h2>Prediction: {result.label}</h2>
          <p>Confidence: {result.label === 'Pneumonia' ? result.percentage.toFixed(2) : ((100 - result.percentage).toFixed(2))}%</p>
        </div>
      )}
    </header>
  );
};

export default Home;
