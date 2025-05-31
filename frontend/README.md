# Iris Classifier 🌸

A full-stack web application that predicts Iris flower species using machine learning. This project combines a Flask backend with a React frontend to create an interactive and user-friendly interface for Iris flower classification.

## 🌟 Features

- Real-time Iris flower species prediction
- Clean and intuitive user interface
- Machine learning model trained on the classic Iris dataset
- RESTful API architecture
- Responsive design

## 🛠️ Tech Stack

### Backend
- Python 3.12
- Flask
- scikit-learn
- NumPy

### Frontend
- React
- Vite
- CSS3

## 🚀 Getting Started

### Prerequisites
- Python 3.12 or higher
- Node.js and npm

### Backend Setup
1. Clone the repository
```bash
git clone https://github.com/yourusername/iris-classifier.git
cd iris-classifier
```

2. Create a virtual environment and activate it
```bash
python -m venv venv
# On Windows
venv\Scripts\activate
# On Unix or MacOS
source venv/bin/activate
```

3. Install required packages
```bash
pip install flask
pip install flask-cors
pip install scikit-learn
pip install numpy
pip install joblib
```

4. Run the Flask server
```bash
python app.py
```
The server will start at `http://127.0.0.1:5000`

### Frontend Setup
1. Navigate to the frontend directory
```bash
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```
The frontend will be available at `http://localhost:5173`

## 📝 API Documentation

### Predict Iris Species
- **Endpoint:** `/predict`
- **Method:** POST
- **Request Body:**
```json
{
    "sepal_length": 5.1,
    "sepal_width": 3.5,
    "petal_length": 1.4,
    "petal_width": 0.2
}
```
- **Response:**
```json
{
    "prediction": "setosa"
}
```

## 👨‍💻 Author

**Mohamed Amine Mammar El Hadj**
- LinkedIn: [Connect with me](https://www.linkedin.com/in/mohamed-amine-mammar-el-hadj-715a41295)

---
⭐ Star this repository if you find it helpful!
