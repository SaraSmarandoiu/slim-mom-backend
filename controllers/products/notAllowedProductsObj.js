const getNotAllowedProducts = require("./getNotAllowedProducts");

const notAllowedProductsObj = async bloodType => {
    const notAllowedProductsArray = await getNotAllowedProducts(bloodType);

    console.log('Not allowed products array:', notAllowedProductsArray);

    const arr = notAllowedProductsArray.map(({ title }) => title);
    
    let notAllowedProductsAll = [...new Set(arr)];

    const message = ['You can eat everything'];
    if (notAllowedProductsAll.length === 0) {
        notAllowedProductsAll = message;
    }

    console.log('Final not allowed products:', notAllowedProductsAll);

    const result = { notAllowedProductsAll, notAllowedProducts: notAllowedProductsAll };
    return result;
};

module.exports = notAllowedProductsObj;
