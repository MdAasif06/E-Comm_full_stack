# 🛒 StrideX - Full Stack E-commerce Platform

A complete MERN Stack E-commerce application with secure authentication, Stripe payment integration, admin dashboard analytics, and real-time revenue tracking.

---

## 🚀 Live Demo

Frontend: https://your-vercel-link.vercel.app  
Backend: https://your-render-link.onrender.com

---

## 📌 Features

### 👤 User Features
- User Registration & Login (JWT Authentication)
- Add to Cart
- Size Selection
- Order Placement
- Stripe Secure Payment Gateway
- Order History
- Payment Success & Cancel Handling

### 🛠 Admin Features
- Admin Dashboard
- Revenue Analytics (Monthly Revenue Chart)
- Total Orders / Products Overview
- Low Stock Alerts (Stock < 5)
- Admin-only Route Protection

---

## 📊 Admin Dashboard Includes

- Total Revenue
- Total Orders
- Total Products
- Low Stock Product Count
- Monthly Revenue Bar Chart (Real Database Data)

---

## 🧰 Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- Recharts (Revenue Chart)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Stripe Payment Integration

### Deployment
- Frontend: Vercel
- Backend: Render

---

## 🔐 Authentication Flow

- JWT token generated on login/register
- Token stored in localStorage
- Protected routes using middleware
- Admin role-based access control

---

## 💳 Stripe Payment Integration

- Checkout session creation
- Redirect to Stripe hosted payment page
- Webhook handling
- Payment success/cancel page handling

```

stridex-frontend/
 │
src/
  │
  ├── api/
  ├── components/
  ├── context/
  ├── layouts/
  ├── pages/
  └── routes/
  └── App.jsx/
  └── main.jsx/

stridex-backend/
  ├── controllers/
  ├── models/
  ├── routes/
  ├── middleware/
  └── config/
  └── services/
  └── validators/
  └── utils/
  └── app/
  └── server/


  
  ```

