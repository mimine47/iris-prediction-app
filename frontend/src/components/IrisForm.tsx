import { useState, type ChangeEvent, type FormEvent } from 'react';

interface IrisFormData {
  sepal_length: number;
  sepal_width: number;
  petal_length: number;
  petal_width: number;
}

export default function IrisForm() {
  const [formData, setFormData] = useState<IrisFormData>({ sepal_length: 0, sepal_width: 0, petal_length: 0, petal_width: 0 });
  const [prediction, setPrediction] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: IrisFormData) => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setPrediction(data.prediction);
      } else {
        setError(data.error || 'Unknown error');
      }
    } catch (err) {
      setError('Network error');
    }
    setIsLoading(false);
  };

  return (
    <div className="iris-form">
      <h2>Predict Iris Species</h2>
      {error && <p className="error-message">Error: {error}</p>}
      {prediction && <p className="prediction-result">Prediction: {prediction}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="sepal_length">Sepal Length (cm):</label>
          <input type="number" id="sepal_length" name="sepal_length" value={formData.sepal_length} onChange={handleChange} step="0.1" required />
        </div>
        <div className="form-group">
          <label htmlFor="sepal_width">Sepal Width (cm):</label>
          <input type="number" id="sepal_width" name="sepal_width" value={formData.sepal_width} onChange={handleChange} step="0.1" required />
        </div>
        <div className="form-group">
          <label htmlFor="petal_length">Petal Length (cm):</label>
          <input type="number" id="petal_length" name="petal_length" value={formData.petal_length} onChange={handleChange} step="0.1" required />
        </div>
        <div className="form-group">
          <label htmlFor="petal_width">Petal Width (cm):</label>
          <input type="number" id="petal_width" name="petal_width" value={formData.petal_width} onChange={handleChange} step="0.1" required />
        </div>
        <button type="submit" disabled={isLoading}> {isLoading ? 'Predicting...' : 'Predict'} </button>
      </form>
    </div>
  );
} 