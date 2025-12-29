// File: backend/debug_models.js
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

console.log("--- BẮT ĐẦU KIỂM TRA ---");
console.log("Key đang dùng:", API_KEY ? "Đã load được Key *****" : "CHƯA CÓ KEY!");

// Dùng fetch native của Node.js (Node 18+)
fetch(url)
  .then(res => res.json())
  .then(data => {
    if (data.error) {
        console.error("❌ LỖI TỪ GOOGLE:", data.error.message);
        console.error("Nguyên nhân:", data.error.status);
    } else if (data.models) {
        console.log("✅ KẾT NỐI THÀNH CÔNG! Danh sách model khả dụng cho Key này:");
        // Lọc ra các model chat
        const chatModels = data.models
            .filter(m => m.supportedGenerationMethods.includes("generateContent"))
            .map(m => m.name.replace("models/", ""));
        
        console.log(chatModels);
        console.log("\n=> Bạn hãy copy một trong các tên trên vào code controller.");
    } else {
        console.log("⚠️ Phản hồi lạ:", data);
    }
  })
  .catch(err => console.error("❌ Lỗi mạng/Code:", err));