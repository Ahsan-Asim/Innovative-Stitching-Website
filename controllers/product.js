const Pro = require("../Models/product");
const path = require("path");

async function handleAddProduct(req, res) {
  try {
      const existingUser = await Pro.findOne({ email: req.body.email });
      if (existingUser) {
          return res.status(400).send("Product with the same email already exists.");
      }

      const newPro = new Pro({
          name: req.body.name,
          price: req.body.price,
          email: req.body.email,
          phone: req.body.phoneNumber,
          code: req.body.code,
          image: req.file ? req.file.filename : null  // Save the image filename
      });

      await newPro.save();
      console.log("Record inserted successfully");

      return res.redirect('/addProduct.html');

  } catch (error) {
      console.error("Error:", error);
      return res.status(500).send("Internal Server Error");
  }
}

async function handleCustomerDashboard(req, res) {
  try {
      const products = await Pro.find({});
      res.json(products);
  } catch (error) {
      console.error("Error:", error);
      return res.status(500).send("Internal Server Error");
  }
}

module.exports = {
    handleAddProduct,
    handleCustomerDashboard,
};
