const getNotAllowedProducts = require("./getNotAllowedProducts");

const notAllowedProductsObj = async bloodType => {
    const notAllowedProductsArray = await getNotAllowedProducts(bloodType);
    
    const arr = [];
    notAllowedProductsArray.forEach(({ title }) => arr.push(title));

    let notAllowedProductsAll = [...new Set(arr)];

    const message = ['You can eat everything'];
    let notAllowedProducts = [];

    if (notAllowedProductsAll.length > 0) {
        do {
            const index = Math.floor(Math.random() * notAllowedProductsAll.length);
            if (!notAllowedProducts.includes(notAllowedProductsAll[index])) {
                notAllowedProducts.push(notAllowedProductsAll[index]);
            }
        } while (notAllowedProducts.length < 5);
    } else {
        notAllowedProductsAll = message;
        notAllowedProducts = message;
    }
    const result = { notAllowedProductsAll, notAllowedProducts };
    return result;
};

module.exports = notAllowedProductsObj;
