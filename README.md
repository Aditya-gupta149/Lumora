# 🚀 Lumora

<div align="center">

<img src="https://img.shields.io/badge/React-18-blue?logo=react">
<img src="https://img.shields.io/badge/Node.js-Express-green?logo=node.js">
<img src="https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb">
<img src="https://img.shields.io/badge/Socket.IO-Real--Time-black?logo=socket.io">
<img src="https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel">
<img src="https://img.shields.io/badge/Render-Backend-blue?logo=render">

### A Modern Real-Time Chat Application built with the MERN Stack

Secure • Fast • Real-Time • Responsive

</div>

---

## 📖 Overview

Lumora is a full-stack real-time messaging platform that delivers a smooth and secure communication experience. It supports one-to-one chats, group conversations, live online status, encrypted message storage, profile management, and instant messaging powered by Socket.IO.

The application is designed with scalability, security, and clean architecture in mind, making it suitable for production-level learning and portfolio showcase.

---

# ✨ Features

### 👤 Authentication

- User Registration
- Secure Login
- JWT Authentication
- Protected Routes
- Password Hashing using bcrypt

---

### 💬 Real-Time Messaging

- One-to-One Chat
- Group Chat
- Instant Message Delivery
- Real-Time Updates using Socket.IO
- Latest Message Preview
- Chat Search
- Auto Chat Creation

---

### 👥 User Features

- Search Users
- Profile Pictures
- Online / Offline Status
- Last Seen
- Responsive Sidebar
- Beautiful Chat Interface

---

### 🔒 Security

- JWT Authentication
- Password Hashing
- AES Message Encryption
- Encrypted Messages Stored in MongoDB
- Automatic Message Decryption on Client
- Protected API Routes

---

### ☁️ Media

- Cloudinary Image Upload
- Avatar Support

---

### 🌐 Deployment

- Frontend deployed on **Vercel**
- Backend deployed on **Render**
- Database hosted on **MongoDB Atlas**

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- JavaScript
- CSS
- Socket.IO Client
- Axios
- CryptoJS

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JWT
- bcrypt
- CryptoJS
- Cloudinary
- Multer

---

## Database

- MongoDB Atlas

---

## Deployment

- Vercel
- Render

---

# 📂 Project Structure

```
Lumora/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   ├── utils/
│   │   └── socket.js
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── socket/
│   ├── utils/
│   └── config/
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Aditya-gupta149/Lumora.git

cd Lumora
```

---

## Install Dependencies

### Client

```bash
cd client

npm install
```

### Server

```bash
cd ../server

npm install
```

---

# Environment Variables

## Client (.env)

```env
VITE_API_URL=your_backend_url
VITE_MESSAGE_SECRET=your_message_secret
```

---

## Server (.env)

```env
PORT=5000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_jwt_secret

MESSAGE_SECRET=your_message_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

---

# ▶️ Run Locally

Start Backend

```bash
cd server

npm run dev
```

Start Frontend

```bash
cd client

npm run dev
```

---

# 🚀 Live Demo

### Frontend

```
https://lumora-xi-tawny.vercel.app/
```

### Backend API

```
https://lumora-backend-xj4p.onrender.com/
```

---

# 📸 Screenshots

> Add screenshots here

- Login Page
- <img width="1717" height="951" alt="Screenshot 2026-07-04 220110" src="https://github.com/user-attachments/assets/55dc90e5-2445-483c-85f0-5fa384a6a9ea" />

- Register Page
- <img width="1696" height="961" alt="image" src="https://github.com/user-attachments/assets/f1f53a73-afb0-43ca-9aa8-c22744db9136" />

- Chat Window
- <img width="1723" height="940" alt="Screenshot 2026-07-04 215831" src="https://github.com/user-attachments/assets/687a9051-710a-4a60-a21c-d60a1cd13104" />

- Group Chat
- <img width="1705" height="892" alt="Screenshot 2026-07-04 220007" src="https://github.com/user-attachments/assets/2a51a828-2de6-4daf-923f-5ec2c2aa728e" />



---

# 🔐 Message Encryption

Messages are encrypted before being stored in MongoDB using AES encryption.

```
User
   ↓
Encrypt Message
   ↓
MongoDB
   ↓
Fetch Message
   ↓
Decrypt
   ↓
Display
```

---

# 📈 Future Improvements

- Typing Indicator
- Read Receipts
- Voice Messages
- Video Calling
- Audio Calling
- File Sharing
- Emoji Picker
- GIF Support
- Reply to Messages
- Edit/Delete Messages
- Push Notifications
- AI Chat Assistant
- AI Message Summarization
- AI Translation
- End-to-End Encryption
- Two-Factor Authentication
- Message Reactions
- Pinned Chats
- Archived Chats
- Dark/Light Theme
- Progressive Web App (PWA)

---

# 🤝 Contributing

Contributions, issues and feature requests are welcome.

Feel free to fork this repository and submit a pull request.

---

# 👨‍💻 Author

**Aditya Gupta**

- GitHub: https://github.com/Aditya-gupta149
- LinkedIn: *Add your LinkedIn profile*

---

# ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub.

It helps the project reach more developers and motivates future improvements.

---

<div align="center">

### 💙 Built with React, Node.js, MongoDB & Socket.IO

**Lumora — Where Conversations Come Alive.**

</div>
