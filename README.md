# Iris ML Predictor

## Overview

This project is a full-stack application for predicting Iris flower classes using a machine learning model. The backend is a Flask API (written in Python) that loads a trained Iris model (saved as "iris_model.pkl" using joblib) and exposes a /predict endpoint. The frontend is a stunning Next.js (React) application (using Tailwind CSS) that provides a user-friendly form for inputting Iris flower measurements (sepal length, sepal width, petal length, and petal width) and displays the prediction (or an error) via an API call.

## Backend (Flask)

### Description

The backend is a Flask application (written in Python) that loads a trained Iris model (saved as "iris_model.pkl" using joblib) and exposes two endpoints:

• / (GET) – returns a welcome message ("Welcome to the Iris ML API!").  
• /predict (POST) – accepts a JSON payload (with keys "sepal_length", "sepal_width", "petal_length", and "petal_width") and returns a JSON response (with a "prediction" key) or an error message.

### Backend Code (app.py)

Below is the Flask backend code (app.py) (as provided):

-----------------------------------------------------------
from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)
model = joblib.load('iris_model.pkl')

@app.route("/")
def home():
    return "Welcome to the Iris ML API!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        features = np.array([
            data['sepal_length'],
            data['sepal_width'],
            data['petal_length'],
            data['petal_width']
        ]).reshape(1, -1)
        prediction = model.predict(features)
        return jsonify({ 'prediction': prediction[0] })
    except Exception as e:
        return jsonify({ 'error': str(e) })

if __name__ == '__main__':
    app.run(debug=True)
-----------------------------------------------------------

### Running the Backend

• Ensure that you have Python (and pip) installed.  
• Install the required dependencies (for example, using a virtual environment) – for example, run:  
  pip install flask joblib numpy  
• Place your trained model (iris_model.pkl) in the same folder as app.py.  
• Run the Flask server (for example, run "python app.py" in your terminal).  
  The backend will be available at http://localhost:5000.

## Frontend (Next.js)

### Description

The frontend is a Next.js (React) application (using Tailwind CSS) that provides a stunning UI for interacting with the Iris ML backend. It consists of a form (with input fields for sepal length, sepal width, petal length, and petal width) and a submit button. On submission, it sends a POST request (using Axios) to the backend's /predict endpoint and displays the prediction (or an error) in a nice card.

### Frontend Code (pages/index.js)

Below is the Next.js home page (pages/index.js) (as provided):

-----------------------------------------------------------
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [formData, setFormData] = useState({ sepal_length: '', sepal_width: '', petal_length: '', petal_width: '' });
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setPrediction(null);
    try {
      const res = await axios.post('http://localhost:5000/predict', formData);
      setPrediction(res.data.prediction);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while fetching prediction.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-indigo-800 mb-6">Iris ML Predictor</h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="sepal_length" className="block text-sm font-medium text-gray-700">Sepal Length (cm)</label>
            <input
              type="number"
              step="0.1"
              id="sepal_length"
              name="sepal_length"
              value={formData.sepal_length}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="sepal_width" className="block text-sm font-medium text-gray-700">Sepal Width (cm)</label>
            <input
              type="number"
              step="0.1"
              id="sepal_width"
              name="sepal_width"
              value={formData.sepal_width}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            (label htmlFor="petal_length" className="block text-sm font-medium text-gray-700">Petal Length (cm)</label>
            <input
              type="number"
              step="0.1"
              id="petal_length"
              name="petal_length"
              value={formData.petal_length}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            (label htmlFor="petal_width" className="block text-sm font-medium text-gray-700">Petal Width (cm)</label>
            <input
              type="number"
              step="0.1"
              id="petal_width"
              name="petal_width"
              value={formData.petal_width}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? 'Predicting...' : 'Predict Iris Class'}
          </button>
        </form>
        {prediction !== null && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md text-center">
            <h2 className="text-xl font-semibold text-green-800">Prediction</h2>
            <p className="text-lg text-green-600">Iris Class: {prediction}</p>
          </div>
        )}
        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md text-center">
            <h2 className="text-xl font-semibold text-red-800">Error</h2>
            <p className="text-lg text-red-600">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
-----------------------------------------------------------

### Running the Frontend

• Ensure that you have Node.js (and npm) installed.  
• In the "frontend" folder, run "npm install" (or "yarn") to install dependencies (Next.js, React, Axios, Tailwind CSS, PostCSS, and autoprefixer).  
• Run "npm run dev" (or "yarn dev") to start the Next.js development server.  
  The frontend will be available (for example, at http://localhost:3000).

## Model

• The Iris model (saved as "iris_model.pkl" using joblib) is trained (using scikit-learn) on the Iris dataset (with features sepal length, sepal width, petal length, and petal width) to predict the Iris flower class.  
• The backend (Flask) loads this model (using joblib.load) and uses it (via model.predict) to return predictions.

## Summary

• Backend (Flask) – A Python Flask API (app.py) that loads a trained Iris model (iris_model.pkl) and exposes a /predict endpoint (POST) for predictions.  
• Frontend (Next.js) – A stunning Next.js (React) application (using Tailwind CSS) (pages/index.js) that provides a form for inputting Iris flower measurements and displays the prediction (or an error) via an API call.  
• Model – A trained Iris model (saved as "iris_model.pkl") (using joblib) that is used by the backend to predict Iris flower classes.

## Author

• Mohamed Amine Mammar El Hadj – [LinkedIn](https://www.linkedin.com/in/mohamed-amine-mammar-el-hadj-715a41295)

Happy coding!
