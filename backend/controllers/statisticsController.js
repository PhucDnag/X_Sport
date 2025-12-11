import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";

// Helper: Tạo filter ngày tháng (Dùng chung cho cả Order, User, Product)
const getDateFilter = (period, year, month, day) => {
  let startDate, endDate;
  const y = parseInt(year);
  const m = parseInt(month);
  const d = parseInt(day);

  if (period === "day" && y && m && d) {
    startDate = new Date(y, m - 1, d, 0, 0, 0);
    endDate = new Date(y, m - 1, d, 23, 59, 59, 999);
  } else if (period === "month" && y && m) {
    startDate = new Date(y, m - 1, 1);
    endDate = new Date(y, m, 0, 23, 59, 59, 999);
  } else if (period === "year" && y) {
    startDate = new Date(y, 0, 1);
    endDate = new Date(y, 11, 31, 23, 59, 59, 999);
  } else {
    return {}; // "all" hoặc không có tham số -> Lấy tất cả
  }

  return {
    createdAt: {
      $gte: startDate,
      $lte: endDate,
    },
  };
};

// 1. API thống kê tổng quan (Đã sửa Total Products theo ngày)
const getOverallStats = async (req, res) => {
  try {
    const { period, year, month, day } = req.query;
    const dateFilter = getDateFilter(period, year, month, day);

    // Thống kê tổng số đơn hàng (theo thời gian chọn)
    const totalOrders = await orderModel.countDocuments(dateFilter);

    // Thống kê tổng số người dùng (Đăng ký mới trong thời gian chọn)
    const totalUsers = await userModel.countDocuments(dateFilter);

    // [FIXED] Thống kê tổng số sản phẩm (Được thêm vào trong thời gian chọn)
    const totalProducts = await productModel.countDocuments(dateFilter);

    // Thống kê tổng doanh thu (theo thời gian chọn, chỉ tính đơn đã thanh toán)
    const revenueFilter = { ...dateFilter, payment: true };
    const revenueData = await orderModel.aggregate([
      { $match: revenueFilter },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$amount" },
        },
      },
    ]);
    const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

    // Thống kê số đơn hàng theo trạng thái (theo thời gian chọn)
    const ordersByStatus = await orderModel.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({
      success: true,
      data: {
        totalOrders,
        totalUsers,
        totalProducts, // Số liệu này giờ đã thay đổi theo filter
        totalRevenue,
        ordersByStatus,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// 2. API thống kê doanh thu theo thời gian (Biểu đồ cột)
const getRevenueStats = async (req, res) => {
  try {
    const { period, year, month, day } = req.query;
    const dateFilter = getDateFilter(period, year, month, day);
    const matchCondition = { ...dateFilter, payment: true };

    let groupBy = {};
    if (period === "day") {
      groupBy = { _id: { $hour: "$createdAt" }, revenue: { $sum: "$amount" } };
    } else if (period === "month") {
      groupBy = { _id: { $dayOfMonth: "$createdAt" }, revenue: { $sum: "$amount" } };
    } else if (period === "year") {
      groupBy = { _id: { $month: "$createdAt" }, revenue: { $sum: "$amount" } };
    } else {
      groupBy = { _id: { $year: "$createdAt" }, revenue: { $sum: "$amount" } };
    }

    const revenueData = await orderModel.aggregate([
      { $match: matchCondition },
      { $group: groupBy },
      { $sort: { _id: 1 } },
    ]);

    res.json({ success: true, data: revenueData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// 3. API thống kê đơn hàng (Payment Method & Time)
const getOrderStats = async (req, res) => {
  try {
    const { period, year, month, day } = req.query;
    const dateFilter = getDateFilter(period, year, month, day);

    // [FIXED] Thống kê theo phương thức thanh toán (theo thời gian chọn)
    const ordersByPaymentMethod = await orderModel.aggregate([
      { $match: dateFilter }, // Lọc ngày trước
      {
        $group: {
          _id: "$paymentMethod",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({
      success: true,
      data: {
        ordersByPaymentMethod,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// 4. API thống kê sản phẩm (Category)
const getProductStats = async (req, res) => {
  try {
    const { period, year, month, day } = req.query;
    const dateFilter = getDateFilter(period, year, month, day);

    // [FIXED] Thống kê sản phẩm theo danh mục (Sản phẩm được thêm vào trong thời gian chọn)
    const productsByCategory = await productModel.aggregate([
      { $match: dateFilter }, // Lọc ngày trước
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({
      success: true,
      data: {
        productsByCategory,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// 5. API Top products (Thường tính trên số lượng bán ra, cần join với Order)
const getTopProducts = async (req, res) => {
    // Logic cũ của bạn ok, nếu muốn filter theo ngày bán thì cần match orderModel trước khi unwind
    try {
        const { limit = 5 } = req.query;
        // Nếu muốn top sản phẩm bán chạy theo filter ngày tháng thì thêm params vào query và dùng getDateFilter
        // Ở đây giữ nguyên logic lấy top all time hoặc bạn tự thêm filter tương tự getRevenueStats
        const topProducts = await orderModel.aggregate([
            { $match: { payment: true } },
            { $unwind: "$items" },
            {
                $group: {
                    _id: "$items._id",
                    totalQuantity: { $sum: "$items.quantity" },
                    productName: { $first: "$items.name" }
                }
            },
            { $sort: { totalQuantity: -1 } },
            { $limit: parseInt(limit) }
        ]);
        res.json({ success: true, data: topProducts });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export { getOverallStats, getRevenueStats, getTopProducts, getOrderStats, getProductStats };