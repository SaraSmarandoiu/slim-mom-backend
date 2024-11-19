const { MyProducts } = require("../../models");
const countCalories = require("./countCalories");

const addMyProducts = async (req, res) => {
  try {
    const { _id } = req.user;
    const { productName, productWeight, date } = req.body;

    // Log pentru a verifica dacă datele sunt extrase corect
    console.log("Checking for existing product with: ", { date, owner: _id, productName });

    const productCalories = await countCalories(productName, productWeight);
    const owner = req.user._id;  // De asemenea, folosește `_id`, așa cum ai făcut inițial

    const product = await MyProducts.findOne({
      date,
      owner: _id,
      productInfo: { $elemMatch: { productName } },
    });

    if (product) {
      const index = product.productInfo.findIndex(
        (product) => product.productName === productName
      );

      const newWeight =
        Number(product.productInfo[index].productWeight) + Number(productWeight);

      const newCalories =
        Number(product.productInfo[index].productCalories) +
        Number(productCalories);

      await MyProducts.findOneAndUpdate(
        { date, owner: _id },
        {
          $pull: {
            productInfo: { productName },
          },
        }
      );

      await MyProducts.findOneAndUpdate(
        { date, owner: _id },
        {
          $push: {
            productInfo: {
              $each: [
                {
                  productCalories: newCalories.toString(),
                  productName,
                  productWeight: newWeight.toString(),
                },
              ],
              $position: 0,
            },
          },
        }
      );

      const newProduct = await MyProducts.findOne({
        date,
        owner: _id,
      });

      return res.status(201).json({ success: "success", code: 201, newProduct });
    }

    if (await MyProducts.findOne({ date, owner: _id })) {
      await MyProducts.findOneAndUpdate(
        { date, owner: _id },
        {
          $push: {
            productInfo: {
              $each: [
                {
                  productCalories,
                  productName,
                  productWeight,
                },
              ],
              $position: 0,
            },
          },
        }
      );

      const newProduct = await MyProducts.findOne({
        date,
        owner: _id,
      });

      return res.status(201).json({ success: "success", code: 201, newProduct });
    }

    const newProduct = await MyProducts.create({
      date,
      owner: _id,
      productInfo: [{ productCalories, productName, productWeight }],
    });

    return res.status(201).json({
      success: "success",
      code: 201,
      newProduct,
    });
  } catch (error) {
    console.error("Error in addMyProducts: ", error.message);
    return res.status(500).json({ message: error.message });
  }
};

// console.log() trebuie să fie doar în interiorul funcției

module.exports = {
  addMyProducts,
};
