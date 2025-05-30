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

        return jsonify({
            'prediction': prediction[0]
        })

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)