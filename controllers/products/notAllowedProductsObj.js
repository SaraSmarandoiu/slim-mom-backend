const getNotAllowedProducts = require("./getNotAllowedProducts");

const notAllowedProductsObj = async bloodType => {
    const notAllowedProductsArray = await getNotAllowedProducts(bloodType);
    const arr = [];

    notAllowedProductsArray.forEach(({ title }) => arr.push(title));

    let notAllowedProductsAll = [...new Set(arr)];

    const message = ['You can eat everything'];
    let notAllowedProducts = [];


    const result = { notAllowedProductsAll, notAllowedProducts };
    return result;
};

module.exports = notAllowedProductsObj;
