const Product = require('../models/product')
const getAllProductsStatic = async (req, res) => {
    // throw new Error('Error')
    const products = await Product.find({})
res.status(200).json({products})

}
const getAllProducts = async (req, res) => {
res.status(200).json({msg: 'Product route'})

}

module.exports = { getAllProductsStatic, getAllProducts }