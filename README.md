# 🚀 React 19 + Vite 6 E-Commerce Frontend

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

> **Mục tiêu:** Xây dựng giao diện web **Nhanh – Nhẹ – Dễ mở rộng** phục vụ cho nền tảng thương mại điện tử.

---

## 🛠️ Công Nghệ Sử Dụng

Dự án được xây dựng dựa trên các thư viện và công cụ hiện đại nhất:

| Danh mục | Công nghệ |
| :--- | :--- |
| **Core** | React 19, Vite 6 |
| **Styling** | Tailwind CSS |
| **Routing** | React Router DOM |
| **HTTP Client** | Axios |
| **Notification** | React Toastify |
| **Payment** | Stripe, VNPay |

---

## 🧠 Yêu Cầu Tiên Quyết (Prerequisites)

Trước khi bắt đầu, hãy đảm bảo máy tính của bạn đã cài đặt **Node.js**:

1.  Truy cập [https://nodejs.org](https://nodejs.org) và tải phiên bản **LTS**.
2.  Kiểm tra cài đặt bằng Terminal/Command Prompt:

```bash
node -v
# Yêu cầu: v18.x.x trở lên
npm -v
```

---

## ⚙️ Hướng Dẫn Cài Đặt (Installation)

Làm theo các bước sau để chạy dự án dưới local:

### 1️⃣ Clone dự án

```bash
git clone [https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git)
```

### 2️⃣ Cài đặt thư viện (Frontend)

Di chuyển vào thư mục frontend và cài đặt các dependencies:

```bash
cd frontend
npm install
```

### 3️⃣ Cấu hình biến môi trường

Tạo file `.env` trong thư mục `frontend`:

```ini
# URL của Backend API (Server)
VITE_BACKEND_URL=http://localhost:5000
```

### 4️⃣ Khởi chạy dự án

```bash
npm run dev
```

Sau khi chạy thành công, truy cập: 👉 [http://localhost:5173](http://localhost:5173)

> ⚠️ **Lưu ý:** Nếu gặp lỗi `vite: command not found`, hãy chạy lệnh: `npm install -g vite`

---

## 🔐 Cấu Hình Backend (Server Side)

Để hệ thống hoạt động đầy đủ, bạn cần cấu hình file `.env` trong thư mục **Backend** với các thông số sau:

### 🗄️ Database & Cloud

| Dịch vụ | Biến Môi Trường | Mô tả |
| :--- | :--- | :--- |
| **MongoDB** | `MONGODB_URI` | Chuỗi kết nối đến MongoDB Atlas |
| **Cloudinary** | `CLOUDINARY_API_KEY`... | Cấu hình upload ảnh |

**Code mẫu `.env` cho Backend:**

```ini
# --- DATABASE ---
# Đăng ký tại: [https://www.mongodb.com/atlas/database](https://www.mongodb.com/atlas/database)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ten_database

# --- CLOUD STORAGE (Hình ảnh) ---
# Đăng ký tại: [https://cloudinary.com/](https://cloudinary.com/)
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_secret_key

# --- SECURITY (JWT) ---
# Chuỗi bí mật để mã hóa token
JWT_SECRET=your_super_secret_key_here

# --- ADMIN ACCOUNT ---
# Tài khoản quản trị khởi tạo ban đầu
ADMIN_EMAIL=
ADMIN_PASSWORD=
```

---

## 💳 Cấu Hình Cổng Thanh Toán (Payment Gateways)

Hệ thống hỗ trợ thanh toán qua Stripe (Quốc tế) và VNPay (Việt Nam).

### 1. Stripe
- 🎥 **Hướng dẫn cấu hình:** [Xem Video](https://youtu.be/Spp-Mj4dd6k?si=JRRLKkWsE_BdGwYD)

```ini
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxx
```

### 2. VNPay
- 🔗 **Đăng ký Sandbox:** [VNPAY Dev](https://sandbox.vnpayment.vn/devreg/)

```ini
VNP_TMN_CODE=your_tmn_code
VNP_HASH_SECRET=your_hash_secret
VNP_URL=[https://sandbox.vnpayment.vn/paymentv2/vpcpay.html](https://sandbox.vnpayment.vn/paymentv2/vpcpay.html)
FRONTEND_URL=http://localhost:5173
```
