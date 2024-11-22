const { Product } = require("../../models");

const getNotAllowedProducts = async bloodType => {
    if (bloodType < 1 || bloodType > 4) {
        throw new Error("Invalid blood type");
    }

    const blood = [null, false, false, false, false];
    blood[bloodType] = true;

    try {
        const products = await Product.find({
            groupBloodNotAllowed: { $all: [blood] }, 
        });

        return products;
    } catch (error) {
        console.error('Error fetching not allowed products:', error);
        throw new Error('Error fetching products');
    }
};

module.exports = getNotAllowedProducts;
