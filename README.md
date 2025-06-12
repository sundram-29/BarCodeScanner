# 📦 BarCodeScanApp

**BarCodeScanApp** is a full-stack mobile application that allows users to scan barcodes using their smartphone camera, store the scanned data to a MongoDB database, and view all previously scanned entries. Built with **React Native (Expo)** on the frontend and **Node.js + Express + MongoDB** on the backend, this app is ideal for small businesses, warehouses, and academic use cases.

---

## 🧱 Project Structure

BarCodeScanApp/
├── ScanApp/ # Frontend - React Native App
│ ├── App.js
│ ├── screens/
│ │ ├── HomeScreen.js
│ │ ├── LocationScreen.js
│ │ └── BatchScreen.js
│ └── package.json
│
├── backend/ # Backend - Node.js + Express + MongoDB
│ ├── server.js
│ ├── models/
│ │ └── Scan.js
│ ├── .env
│ └── package.json
│
├── BarCodeScanApp_Project_Report.pdf
└── README.md


---

## 🚀 Features

- 📷 **Scan Barcodes** using the device camera (`expo-camera`)
- 🛠️ **Save Data** to MongoDB via Express backend
- 📄 **View All Scanned Batches** with timestamps
- 🧭 **Smooth Navigation** using React Navigation
- 🔐 **Clean, modular structure** ready for scaling

---

## 🛠️ Tech Stack

**Frontend:**
- React Native (Expo)
- React Navigation
- expo-camera

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- dotenv, CORS

---

## ⚙️ Getting Started

### 1. Clone the Repository

git clone https://github.com/sundram-29/BarCodeScan.git
cd BarCodeScanApp



### 2. Setup Frontend (React Native)
cd ScanApp
npm install
npm start

🔍 Make sure Expo Go is installed on your mobile device and both the mobile and your computer are on the same Wi-Fi network.

### 3. Setup Backend (Node.js + MongoDB)

cd backend
npm install

📝 Create a .env file with the following:

initialize the .env file

MONGO_URI=your_mongodb_connection_string
PORT=5000
Then run the server:
node server.js


### 🔗 API Endpoints
Method	Endpoint	Description
POST	/scan	Save scanned barcode
GET	/scans	Get all scanned entries

### 📸 Screens Overview
HomeScreen: Entry screen with buttons for scanning and viewing data.

LocationScreen: Uses expo-camera to scan and send data to backend.

BatchScreen: Displays a list of all scanned batches with timestamps.

### 🧠 Learning Outcomes
Implemented a full-stack mobile app workflow.

Practiced REST API design and integration in mobile apps.

Gained experience in modular file structuring and UI design.

### 🧾 License
This project is licensed under the MIT License.

👨‍💻 Author
Developed by Sundram Pandey
📧 Email: sundrampandey347@gmail.com
