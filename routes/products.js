const express = require('express');
const Product = require('../models/Product');
const protectRoute = require('../middleware/protectRoute'); 

const router = express.Router();

router.post('/add', protectRoute, async (req, res) => {
  const { productId, quantity, date } = req.body;

  try {
    const newProduct = {
      userId: req.user.userId,
      productId,
      quantity,
      date,
    };

    const product = await Product.create(newProduct);

    res.status(201).json({ message: 'Product added successfully', product });
  } catch (err) {
    res.status(500).json({ message: 'Error adding product' });
  }
});

router.get('/products', protectRoute, async (req, res) => {
  try {
    const products = await Product.find({ userId: req.user.userId });

    res.json({ products });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

router.delete('/products/:id', protectRoute, async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findOneAndDelete({ userId: req.user.userId, _id: productId });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product' });
  }
});

module.exports = router;
