const Product = require('../models/product');
const cloudinary = require('../config/Cloudinary');
const fs = require('fs');

const addProduct = async (req, res) => {
  try {
    const { name, description, price, quantity, category, subCategory } = req.body;

    // 1. Upload images to Cloudinary
    const imageUrls = [];
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path);
      imageUrls.push(result.secure_url);
      fs.unlinkSync(file.path); // Delete temp file
    }

    const product = new Product({
      name,
      description,
      price,
      quantity,
      category,
      subCategory,
      images: imageUrls
    });

    // 3. Save to database
    await product.save();

    res.status(201).json({
      success: true,
      product
    });

  } catch (error) {
    // Clean up files if error occurs
    if (req.files) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
      });
    }
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

 /*const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, quantity, category } = req.body;

    try {
        const product = await Product.findByIdAndUpdate(id, { name, description, price, quantity, category }, { new: true });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

} */

    const listProducts = async (req, res) => {
      try {
        const products = await Product.find();
        res.status(200).json({ success: true, products });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };


 const removeProduct = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: 'Product ID is required' });
        }

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        return res.status(200).json({ success: true, message: 'Product removed successfully' });
    } catch (err) {
        console.error('Error removing product:', err);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
const singleProduct = async (req, res) => {
    try {
        const {productId} = req.body;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



module.exports = {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct
};