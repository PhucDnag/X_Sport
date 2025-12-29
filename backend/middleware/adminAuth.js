import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js"; // QUAN TRỌNG: Phải import model để check DB

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({ success: false, message: "Bạn không có quyền truy cập. Vui lòng đăng nhập lại để tiếp tục." });
    }

    // Giải mã token
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // --- TRƯỜNG HỢP 1: Super Admin (Token tạo từ file .env) ---
    if (token_decode === process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      next();
      return;
    }

    // --- TRƯỜNG HỢP 2: Admin thường (Token tạo từ Database ID) ---
    if (token_decode.id) {
      // Tìm user trong DB để chắc chắn user còn tồn tại và đúng là admin
      const user = await userModel.findById(token_decode.id);
      
      if (user && user.role === "admin") {
        // Gán userId vào req để các controller phía sau có thể dùng (ví dụ: tạo đơn hàng, sửa profile)
        req.userId = user._id; 
        next();
        return;
      }
    }
    return res.json({ success: false, message: "Bạn không có quyền truy cập. Tài khoản không phải Admin." });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;