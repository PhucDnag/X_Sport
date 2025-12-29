import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChatBot = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Chào bạn! Bạn cần tìm vợt gì (Victor, Lining, Yonex...)?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    // Ref để cuộn xuống cuối đoạn chat
    const messagesEndRef = useRef(null);

    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

    // Hàm tự động cuộn xuống tin nhắn mới nhất
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen, isLoading]);


    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await axios.post(`${backendUrl}/api/chat/ask`, { message: input });
            
            if (response.data.success) {
                const botMessage = { 
                    sender: 'bot', 
                    text: response.data.reply,
                    products: response.data.products || [] 
                };
                setMessages(prev => [...prev, botMessage]);
            }
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { sender: 'bot', text: 'Xin lỗi, hệ thống đang bận.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleProductClick = (productId) => {
        // setIsOpen(false); // Bỏ comment nếu muốn đóng chat khi click
        navigate(`/product/${productId}`);
        window.scrollTo(0, 0);
    };

    return (
        <div className="fixed bottom-5 right-5 z-[999]">
            {/* Nút mở chat */}
            {!isOpen && (
                <button 
                    onClick={() => setIsOpen(true)}
                    className="bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition-all flex items-center justify-center w-14 h-14"
                >
                    💬 
                </button>
            )}

            {/* Cửa sổ chat */}
            {isOpen && (
                <div className="bg-white w-80 h-[500px] rounded-lg shadow-2xl flex flex-col border border-gray-200 overflow-hidden font-sans">
                    {/* Header */}
                    <div className="bg-black text-white p-3 flex justify-between items-center">
                        <span className="font-semibold text-sm">Trợ lý ảo X-Sport</span>
                        <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-300 px-1">✕</button>
                    </div>

                    {/* Nội dung tin nhắn */}
                    <div className="flex-1 overflow-y-auto p-3 bg-gray-50 text-sm scrollbar-thin scrollbar-thumb-gray-300">
                        {messages.map((msg, index) => (
                            <div key={index} className={`mb-3 flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                                <span className={`inline-block p-2 rounded-lg max-w-[85%] shadow-sm ${
                                    msg.sender === 'user' ? 'bg-black text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                                }`}>
                                    {msg.text}
                                </span>

                                {/* === PHẦN HIỂN THỊ SẢN PHẨM ĐÃ CHỈNH SỬA === */}
                                {msg.products && msg.products.length > 0 && (
                                    // Sử dụng Grid, 2 cột (grid-cols-2), khoảng cách nhỏ (gap-2)
                                    <div className="mt-3 grid grid-cols-2 gap-2 w-full pl-1">
                                        {msg.products.map((prod) => (
                                            <div 
                                                key={prod._id} 
                                                onClick={() => handleProductClick(prod._id)}
                                                // Giao diện thẻ nhỏ gọn hơn: p-1.5, shadow nhẹ, viền mỏng
                                                className="bg-white border border-gray-100 rounded-lg p-1.5 cursor-pointer hover:border-gray-300 transition-all shadow-sm group"
                                            >
                                                <div className="overflow-hidden rounded-md mb-1">
                                                    <img 
                                                        src={prod.image?.[0]} 
                                                        alt={prod.name} 
                                                        // Chiều cao ảnh nhỏ lại (h-14 khoảng 56px)
                                                        className="w-full h-14 object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                                {/* Chữ nhỏ lại text-[11px] */}
                                                <p className="font-medium text-[11px] text-gray-700 truncate w-full" title={prod.name}>
                                                    {prod.name}
                                                </p>
                                                <p className="text-[11px] text-red-600 font-bold mt-0.5">
                                                    {prod.price?.toLocaleString()}đ
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {/* ========================================== */}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex items-start">
                                <div className="bg-gray-200 p-2 rounded-lg rounded-bl-none text-gray-500 text-xs italic animate-pulse">
                                    Đang soạn tin...
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} /> {/* Điểm neo để cuộn xuống */}
                    </div>

                    {/* Input */}
                    <div className="p-2 border-t border-gray-100 flex gap-2 bg-white items-center">
                        <input 
                            type="text" 
                            className="flex-1 border border-gray-200 rounded-full px-3 py-1.5 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all"
                            placeholder="Hỏi về vợt cầu lông..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            disabled={isLoading}
                        />
                        <button 
                            onClick={handleSend}
                            disabled={isLoading || !input.trim()}
                            className={`bg-black text-white w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                                isLoading || !input.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800 hover:scale-105 active:scale-95'
                            }`}
                        >
                            {/* Icon gửi (mũi tên) */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-0.5">
                                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.519 60.519 0 003.478 2.405z" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBot;