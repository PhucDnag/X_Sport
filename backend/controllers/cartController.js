import userModel from "../models/userModel.js";

// add products to user cart
const addToCart = async (req,res) => {
    try {

        const { itemId , size} = req.body
        const userId = req.userId 
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData

     

        if(cartData[itemId]){
            if(cartData[itemId][size]) {
                cartData[itemId][size] +=1;
            }
            else{
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        await userModel.findByIdAndUpdate(userId , {cartData})

        res.json({success:true , message:"Sản phẩm được thêm vào giỏ hàng"})

    } catch (error) {
        console.log(error);
        res.json({success:false , message:error.message})
        
    }
}

//  update user cart
const updateCart = async (req,res) => {
    try {
        // SỬA 1: Lấy userId từ req.userId (giống như addToCart) thay vì req.body
        const userId = req.userId; 
        const { itemId , size , quantity} = req.body
        
        const userData = await userModel.findById(userId)
        
        // SỬA 2: Thêm kiểm tra an toàn để tránh lỗi crash server
        if (!userData) {
            return res.json({success: false, message: "User not found"});
        }

        let cartData = await userData.cartData

        // SỬA 3: Kiểm tra xem sản phẩm có tồn tại trong cartData không trước khi update
        // Để tránh lỗi "Cannot set properties of undefined" nếu item đó không có
        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }

        // Logic cập nhật số lượng
        cartData[itemId][size] = quantity;

        await userModel.findByIdAndUpdate(userId , {cartData})
        res.json({success:true , message:"Giỏ hàng đã được cập nhật"})

    } catch (error) {
        console.log(error);
        res.json({success:false , message:error.message})
    }
}

// get user cart data
const getUserCart = async (req,res) => {
    try {
        const userId = req.userId
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData
   
        
        res.json({success:true , cartData})

    } catch (error) {
        console.log(error);
        res.json({success:false , message:error.message})
    }
}

export {addToCart,updateCart,getUserCart}