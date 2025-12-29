import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";
import crypto from "crypto";
import querystring from "querystring";

dotenv.config();

// global variables
const currency = "usd";
const deliveryCharge = 30000;

//  gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing orders using COD Method

const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      // date: Date.now()
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Đã đặt hàng" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//  Placing orders using Stripe Payment
const placeOrderStripe = async (req, res) => {
  try {
    const { items, amount, address } = req.body;

    const userId = req.userId;

    const origin =
      req.headers.origin || process.env.FRONTEND_URL || "http://localhost:5173";

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const VND_TO_USD = 27110; // tỷ giá mẫu, thay bằng tỷ giá thực tế
    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round((item.price / VND_TO_USD) * 100),
        // unit_amount: item.price *100
        //  Math.round(item.price / VND_TO_USD * 100) nếu giá là VND, chia cho tỷ giá và nhân 100 để chuyển sang cents
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Phí giao hàng",
        },
        unit_amount: Math.round((deliveryCharge / VND_TO_USD) * 100),
        // unit_amount: deliveryCharge  * 100
        //  Math.round(deliveryCharge / VND_TO_USD * 100) nếu giá là VND, chia cho tỷ giá và nhân 100 để chuyển sang cents
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// verify Stripe

const verifyStripe = async (req, res) => {
  const { orderId, success } = req.body;
  const userId = req.userId;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true, message: "Đặt hàng thành công" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Đặt hàng thất bại" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//  Placing orders using VNPAY QR
const buildVnpParams = ({
  amount,
  orderId,
  ipAddr,
  returnUrl,
  orderInfo = "Thanh toan don hang",
}) => {
  const vnp_TmnCode = process.env.VNP_TMN_CODE;
  const vnp_Version = "2.1.0";
  const vnp_Command = "pay";
  const vnp_Locale = "vn";
  const vnp_CurrCode = "VND";
  const createDate = new Date();
  const pad = (n) => (n < 10 ? "0" + n : n);
  const yyyy = createDate.getFullYear();
  const MM = pad(createDate.getMonth() + 1);
  const dd = pad(createDate.getDate());
  const HH = pad(createDate.getHours());
  const mm = pad(createDate.getMinutes());
  const ss = pad(createDate.getSeconds());
  const vnp_CreateDate = `${yyyy}${MM}${dd}${HH}${mm}${ss}`;

  const params = {
    vnp_Version,
    vnp_Command,
    vnp_TmnCode,
    vnp_Amount: amount * 100,
    vnp_CurrCode,
    vnp_TxnRef: String(orderId),
    vnp_OrderInfo: orderInfo,
    vnp_OrderType: "other",
    vnp_Locale,
    vnp_ReturnUrl: returnUrl,
    vnp_IpAddr: ipAddr || "0.0.0.0",
    vnp_CreateDate,
  };

  if (process.env.VNP_BANK_CODE) {
    params.vnp_BankCode = process.env.VNP_BANK_CODE;
  }
  return params;
};

const sortObject = (obj) => {
  const sorted = {};
  const keys = Object.keys(obj).sort();
  keys.forEach((key) => {
    sorted[key] = obj[key];
  });
  return sorted;
};

const encodeParamsForVnp = (obj) => {
  const out = {};
  Object.keys(obj).forEach((key) => {
    out[key] = encodeURIComponent(String(obj[key])).replace(/%20/g, "+");
  });
  return out;
};


const signVnp = (params) => {
  const secret = process.env.VNP_HASH_SECRET;
  
  // 1. Sắp xếp params
  const sortedParams = sortObject(params);
  
  // 2. Tạo chuỗi signData thủ công để tránh querystring mã hóa sai
  // Format: key1=value1&key2=value2...
  // Lưu ý: params truyền vào hàm này LÀ PARAMS ĐÃ ĐƯỢC MÃ HÓA (encodedParams)
  const signData = Object.keys(sortedParams)
    .map(key => `${key}=${sortedParams[key]}`)
    .join('&');

  // 3. Tạo HMAC
  const hmac = crypto.createHmac('sha512', secret);
  const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
  
  return { signed, signData };
};

const placeOrderVnpay = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;
    const origin = req.headers.origin || process.env.FRONTEND_URL || "http://localhost:5173";

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "VNPAY",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const returnUrl = `${origin}/verify`;

    // --- FIX LỖI IP ---
    let ipAddr =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.connection?.remoteAddress ||
      req.socket?.remoteAddress ||
      req.connection?.socket?.remoteAddress ||
      "127.0.0.1";

    // Nếu IP là IPv6 localhost (::1), ép về IPv4
    if (ipAddr === "::1") {
        ipAddr = "127.0.0.1";
    }
    // ------------------

    const params = buildVnpParams({
      amount,
      orderId: newOrder._id,
      ipAddr, // Sử dụng IP đã fix
      returnUrl,
      orderInfo: `Thanh toan don hang ${newOrder._id}`,
    });

    // Encode params trước
    const encodedParams = encodeParamsForVnp(params);
    
    // Tạo chữ ký từ params đã encode
    const { signed, signData } = signVnp(encodedParams);
    
    // DEBUG LOGS (Kiểm tra xem %25 còn xuất hiện không)
    // console.log('[VNP params encoded]', encodedParams);
    // console.log('[VNP signData]', signData); // Chuỗi này không được chứa %25 (trừ khi dữ liệu gốc có %)
    // console.log('[VNP secureHash]', signed);

    const baseUrl = process.env.VNP_URL || "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    
    // Tạo URL thanh toán
    // Sử dụng logic map + join tương tự để tạo query string cuối cùng
    const finalParams = {
        ...encodedParams,
        vnp_SecureHashType: "SHA512",
        vnp_SecureHash: signed,
    };
    
    // Sắp xếp lại lần cuối cho chắc chắn (dù không bắt buộc ở bước này nhưng nên làm cho url đẹp)
    const sortedFinalParams = sortObject(finalParams);
    const query = Object.keys(sortedFinalParams)
        .map(key => `${key}=${sortedFinalParams[key]}`)
        .join('&');
        
    const paymentUrl = `${baseUrl}?${query}`;
    
    // console.log('[VNP paymentUrl]', paymentUrl);

    res.json({ success: true, paymentUrl, orderId: newOrder._id });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// All Orders Data for Admin page
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// User Orders Data for fontEnd
const userOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// update order status from Admin page
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    if (status === "Đã giao hàng") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
    }
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Trạng thái đã cập nhật" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Verify VNPAY
// Verify VNPAY
const verifyVnpay = async (req, res) => {
  try {
    const vnp_Params = { ...req.body };
    const userId = req.userId;

    // 1. Lấy dữ liệu cần thiết
    const vnp_SecureHash = vnp_Params.vnp_SecureHash;
    const orderId = vnp_Params.vnp_TxnRef; // Lấy Order ID từ trường vnp_TxnRef
    const responseCode = vnp_Params.vnp_ResponseCode; // Lấy mã phản hồi (00 là thành công)

    // 2. Xóa các trường không cần thiết để check chữ ký
    delete vnp_Params.vnp_SecureHashType;
    delete vnp_Params.vnp_SecureHash;

    // 3. Encode lại params theo chuẩn VNPAY để check chữ ký
    const encodedVnpParams = encodeParamsForVnp(vnp_Params);
    const { signed: checkSum } = signVnp(encodedVnpParams);

    // 4. Kiểm tra chữ ký và mã lỗi
    if (checkSum === vnp_SecureHash && responseCode === "00") {
      // --- CẬP NHẬT TRẠNG THÁI THANH TOÁN TẠI ĐÂY ---
      await orderModel.findByIdAndUpdate(orderId, { payment: true }); 
      
      // Xóa giỏ hàng sau khi thanh toán thành công
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      
      return res.json({ success: true, message: "Thanh toán thành công" });
    } else {
      // Nếu thanh toán thất bại hoặc hủy, xóa đơn hàng nháp
      await orderModel.findByIdAndDelete(orderId);
      
      return res.json({
        success: false,
        message: "Thanh toán thất bại hoặc chữ ký không hợp lệ",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  verifyStripe,
  placeOrder,
  placeOrderStripe,
  placeOrderVnpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyVnpay,
};
