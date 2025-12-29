import { GoogleGenerativeAI } from "@google/generative-ai";
import productModel from "../models/productModel.js";
import dotenv from 'dotenv';
dotenv.config();

// Khởi tạo Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const chatWithAI = async (req, res) => {
    try {
        const { message } = req.body;

        // 1. Logic tìm kiếm sản phẩm
        let foundProducts = [];
        const searchKeywords = ["tìm", "mua", "vợt", "giá", "có", "xem", "victor", "lining", "yonex", "karsile"]; 
        const isSearchIntent = searchKeywords.some(keyword => message.toLowerCase().includes(keyword));

        if (isSearchIntent) {
            foundProducts = await productModel.find({
                $or: [
                    { name: { $regex: message, $options: 'i' } },
                    { category: { $regex: message, $options: 'i' } },
                    { description: { $regex: message, $options: 'i' } }
                ]
            })
            // Lấy các trường cần thiết để hiển thị frontend
            .select('_id name price image category bestseller sizes') 
            .limit(5);
        }

        // 2. Tạo Prompt
        let prompt = `Bạn là nhân viên tư vấn shop cầu lông.
        Câu hỏi: "${message}"
        
        Dữ liệu sản phẩm tìm thấy (Hệ thống sẽ tự hiển thị hình ảnh cho khách, bạn không cần liệt kê chi tiết từng món):
        ${foundProducts.length > 0 ? JSON.stringify(foundProducts) : "Không tìm thấy."}
        
        Yêu cầu:
        - Nếu có sản phẩm: Chỉ cần nói ngắn gọn "Dạ, bên em có các mẫu ${message} này ạ, mời bạn xem bên dưới:" hoặc câu tương tự.
        - Nếu không có: Tư vấn lịch sự hoặc gợi ý khác.
        - Ngắn gọn, thân thiện.`;

        // 3. Gọi AI (ĐÂY LÀ PHẦN BẠN BỊ THIẾU)
        // Dùng model 1.5-flash để miễn phí và nhanh
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        // Lấy nội dung trả lời gán vào biến text
        const text = response.text(); 

        // 4. Trả về kết quả
        res.json({ success: true, reply: text, products: foundProducts });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { chatWithAI };