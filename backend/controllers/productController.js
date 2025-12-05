import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// function for add product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        };

        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: "Sản phẩm đã thêm" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// function for update product (NEW)
const updateProduct = async (req, res) => {
    try {
        const { id, name, description, price, category, subCategory, sizes, bestseller } = req.body;

        if (!id) {
            return res.json({ success: false, message: "Không tìm thấy ID sản phẩm" });
        }

        // 1. Tìm sản phẩm hiện tại trong DB để lấy danh sách ảnh cũ
        const product = await productModel.findById(id);
        if (!product) {
            return res.json({ success: false, message: "Sản phẩm không tồn tại" });
        }

        // Tạo bản sao danh sách ảnh hiện tại (đảm bảo luôn là mảng)
        let updatedImages = [...(product.image || [])];

        // 2. Cập nhật thông tin text
        const updateData = {
            name: name || product.name,
            description: description || product.description,
            price: price ? Number(price) : product.price,
            category: category || product.category,
            subCategory: subCategory || product.subCategory,
            // Xử lý bestseller (vì gửi từ FormData là string "true"/"false")
            bestseller: bestseller === "true" ? true : (bestseller === "false" ? false : product.bestseller),
            sizes: sizes ? JSON.parse(sizes) : product.sizes,
        };

        // 3. Xử lý hình ảnh: Chỉ thay thế vị trí nào có file mới
        // Lưu ý: updatedImages[0] tương ứng image1, [1] tương ứng image2...
        
        if (req.files.image1 && req.files.image1[0]) {
            const result = await cloudinary.uploader.upload(req.files.image1[0].path, { resource_type: 'image' });
            updatedImages[0] = result.secure_url;
        }
        if (req.files.image2 && req.files.image2[0]) {
            const result = await cloudinary.uploader.upload(req.files.image2[0].path, { resource_type: 'image' });
            updatedImages[1] = result.secure_url;
        }
        if (req.files.image3 && req.files.image3[0]) {
            const result = await cloudinary.uploader.upload(req.files.image3[0].path, { resource_type: 'image' });
            updatedImages[2] = result.secure_url;
        }
        if (req.files.image4 && req.files.image4[0]) {
            const result = await cloudinary.uploader.upload(req.files.image4[0].path, { resource_type: 'image' });
            updatedImages[3] = result.secure_url;
        }

        // Lọc bỏ các giá trị undefined/null trong mảng ảnh (đề phòng trường hợp mảng bị ngắt quãng)
        updateData.image = updatedImages.filter(item => item);

        // 4. Lưu vào DB
        await productModel.findByIdAndUpdate(id, updateData);

        res.json({ success: true, message: "Cập nhật sản phẩm thành công" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// function for list product
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// function for remove product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Sản phẩm đã xóa thành công" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// function for single product info
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId);
        res.json({ success: true, product });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { listProducts, addProduct, removeProduct, singleProduct, updateProduct };