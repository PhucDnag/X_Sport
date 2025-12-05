# 🚀 React + Vite Frontend

Dự án này được xây dựng bằng **React 19 + Vite 6**, kết hợp **Tailwind CSS**, **React Router**, **Axios** và **React Toastify**.  
🎯 **Mục tiêu:** Tạo giao diện web **nhanh – nhẹ – dễ mở rộng**.

## 🧠 Yêu cầu trước khi chạy (dành cho người mới)

Nếu bạn chưa từng làm việc với **React** hoặc **Node.js**, hãy làm theo các bước dưới đây.

### 1️⃣ Cài đặt Node.js và npm

🔗 Truy cập: [https://nodejs.org](https://nodejs.org)  
→ Bấm **Download LTS (phiên bản ổn định)**  
→ Cài đặt như phần mềm bình thường (**Next → Next → Finish**)

Sau khi cài xong, mở **Command Prompt (cmd)** hoặc **Terminal** và kiểm tra:

`node -v`
`npm -v`


Nếu thấy hiện số phiên bản *(ví dụ: v20.x.x, 10.x.x)* thì đã cài thành công ✅

## ⚙️ Cách cài đặt và chạy project

### 2️⃣ Clone project từ GitHub

Mở terminal và gõ:

`git clone https://github.com/<tên-tài-khoản>/<tên-repo>.git`


3️⃣ Di chuyển vào thư mục project
`cd frontend`

4️⃣ Cài đặt thư viện cần thiết

Chạy lệnh:
`npm install`


Lệnh này sẽ tự động tải và cài đặt tất cả các thư viện trong file package.json.

5️⃣ Chạy project ở chế độ phát triển

Sau khi cài xong, chạy:
`npm run dev`


Nếu thấy hiện ra dòng như sau:

  VITE v6.3.5  ready in 500ms
  ➜  Local:   http://localhost:5173/


👉 Mở trình duyệt và dán địa chỉ http://localhost:5173 để xem giao diện web.


⚠️ Nếu bạn thấy lỗi vite: command not found, hãy cài Vite toàn cục:
`npm install -g vite`

⚛️ Frontend & Admin (.env)
VITE_BACKEND_URL=http://localhost:5000
📌 Giải thích:
VITE_BACKEND_URL → URL API backend để FE & Admin gọi dữ liệu.

🚀 Backend (.env)
🗄️ MongoDB Atlas
Đăng ký tại:
🔗 https://www.mongodb.com/products/platform/atlas-database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ten_database

☁️ Cloudinary (Quản lý hình ảnh)
Đăng ký tại:
🔗 https://cloudinary.com/

CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_secret_key
CLOUDINARY_NAME=your_cloud_name

🔐 Bảo mật JWT
JWT_SECRET=your_jwt_secret_key
📌 Dùng để mã hóa token đăng nhập.

👑 Tài khoản Admin mặc định
ADMIN_EMAIL=
ADMIN_PASSWORD=
📌 Tài khoản dùng để đăng nhập trang quản trị lần đầu.

💳 Stripe (Thanh toán quốc tế)
🎥 Video hướng dẫn cấu hình:
🔗 https://youtu.be/Spp-Mj4dd6k?si=JRRLKkWsE_BdGwYD
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxx

🇻🇳 VNPAY (Thanh toán Việt Nam)
Đăng ký test tại:
🔗 https://sandbox.vnpayment.vn/devreg/

VNP_TMN_CODE=your_tmn_code
VNP_HASH_SECRET=your_hash_secret
VNP_URL=https://sandbox.vnpayment.vn/paymentv2/vpcpay.html
FRONTEND_URL=