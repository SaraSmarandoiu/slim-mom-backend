const { Product } = require("../../models");

const getNotAllowedProducts = async bloodType => {
    if (bloodType < 1 || bloodType > 4) {
        throw new Error("Invalid blood type");
    }

    const blood = [null, false, false, false, false];
    blood[bloodType] = true;

    try {
        console.log(`Fetching products for blood type: ${bloodType}`);
        const products = await Product.find({
            groupBloodNotAllowed: { $all: [blood] }, 
        });

        console.log('Products found:', products);

        return products;
    } catch (error) {
        console.error('Error fetching not allowed products:', error);
        throw new Error('Error fetching products');
    }
};

module.exports = getNotAllowedProducts;
