from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS 
app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])


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

        # You might want to convert the prediction to a string if it's a numerical label
        # For example, if prediction[0] is 0, 1, or 2:
        # species = ["setosa", "versicolor", "virginica"]
        # predicted_species = species[prediction[0]]
        # return jsonify({ 'prediction': predicted_species })
        # Or if the model directly predicts strings:
        return jsonify({
            'prediction': prediction[0] # Assuming prediction[0] is already the desired string
        })

    except Exception as e:
        # Log the error on the server side for debugging
        print(f"Error during prediction: {e}")
        return jsonify({'error': str(e)}), 500 # Return a 500 status code for server errors

if __name__ == '__main__':
    # It's better to explicitly set host and port for development
    app.run(debug=True, host='127.0.0.1', port=5000)