# Legi Doc

A mobile application designed to convert illegible doctor's handwriting into legible text using advanced machine learning techniques.

## 📋 Overview

Legi Doc addresses the common challenge of deciphering medical prescriptions and doctor's notes by leveraging deep learning technology. The application uses a Bidirectional Long Short-Term Memory (Bi-LSTM) neural network to analyze and convert handwritten medical text into readable digital format.

**Current Accuracy:** ~50% (actively being improved)

## ✨ Features

- 📱 Cross-platform mobile application (iOS & Android)
- 🤖 AI-powered handwriting recognition
- 📝 Real-time text conversion
- 💾 Save and manage converted texts
- 🔄 Image preprocessing for better recognition
- 📊 Confidence scoring for predictions

## 🏗️ Architecture

### Frontend
- **Framework:** React Native
- **Language:** TypeScript
- **Development:** Expo
- **Platform:** iOS & Android

### Backend
- **Framework:** Flask (Python)
- **API:** RESTful web services
- **Image Processing:** PIL/OpenCV

### Machine Learning
- **Model:** Bidirectional LSTM (Bi-LSTM)
- **Framework:** TensorFlow
- **Development:** Jupyter Notebook
- **Training Data:** Handweave Image and Pharmacy Receipts Dataset

## 🧠 Model Details

### Architecture
- **Type:** Bidirectional LSTM (Bi-LSTM)
- **Input:** Preprocessed handwriting images
- **Output:** Character-level predictions
- **Training:** Supervised learning on medical handwriting dataset

### Performance Metrics
- **Accuracy:** ~50%
- **Inference Time:** ~1-3 seconds per image
- **Model Size:** ~25MB

### Training Process
1. Data collection and preprocessing
2. Feature extraction from handwriting images
3. Sequence-to-sequence model training
4. Hyperparameter tuning
5. Model validation and testing

## 📱 Usage

1. **Launch the app** on your mobile device
2. **Capture or upload** an image of doctor's handwriting
3. **Wait for processing** (1-3 seconds)
4. **Review the converted text** with confidence score
5. **Save or edit** the result as needed

## 🔮 Future Improvements

- [ ] Increase model accuracy to 80%+
- [ ] Add multi-language support
- [ ] Implement offline mode
- [ ] Add prescription validation
- [ ] Integrate with pharmacy systems
- [ ] Add user feedback loop for model improvement
- [ ] Implement drug name dictionary for better context
