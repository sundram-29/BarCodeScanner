# 📦 BarCodeScanApp

**BarCodeScanApp** is a full-stack mobile application that allows users to scan barcodes using their smartphone camera, store the scanned data in a MongoDB database, and view all previously scanned entries. Built with **React Native (Expo)** on the frontend and **Node.js + Express + MongoDB** on the backend, this app is ideal for small businesses, warehouses, and academic use cases.

---

## 🧱 Project Structure

```
BarCodeScan/
├── ScanApp/           # Frontend - React Native App
│   ├── App.js
│   ├── screens/
│   │   └── HomeScreen.js
│   ├── components/
│   │   └── BatchTable.js
│   └── package.json
│
├── Backend/           # Backend - Node.js + Express + MongoDB
│   ├── server.js
│   ├── models/
│   │   └── Scan.js
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## 🚀 Features

- 📷 **Scan Barcodes** using the device camera (`expo-camera`)
- 🛠️ **Save Data** to MongoDB via Express backend
- 📄 **View All Scanned Batches** with timestamps
- 🧭 **Smooth Navigation** using React Navigation
- 🧹 **Clean, modular structure** ready for scaling

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

```sh
git clone https://github.com/sundram-29/BarCodeScan.git
cd BarCodeScan
```

### 2. Setup Frontend (React Native)

```sh
cd ScanApp
npm install
npm start
```

> **Note:** Make sure Expo Go is installed on your mobile device and both your mobile and computer are on the same Wi-Fi network.

### 3. Setup Backend (Node.js + MongoDB)

```sh
cd Backend
npm install
```

Create a `.env` file with the following content:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Then run the server:

```sh
node server.js
```

---

### 🔗 API Endpoints

| Method | Endpoint | Description            |
|--------|----------|------------------------|
| POST   | /scan    | Save scanned barcode   |
| GET    | /scans   | Get all scanned entries|

---

### 📸 Screens Overview

- **HomeScreen:** Entry screen with input fields and action buttons.
- **Camera Modal:** Uses expo-camera to scan and populate location.
- **BatchScreen:** Displays list of scanned batches with levels and delete action.

---

### 🧠 Learning Outcomes

- Created a full-stack mobile application workflow.
- Designed and integrated REST APIs in a mobile context.
- Gained hands-on experience with modular React Native architecture and backend connectivity.

---

### 🧾 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Developed by Sundram Pandey  
📧 Email: sundrampandey347@gmail.com
