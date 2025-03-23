const express = require('express');
const prodRouter = express.Router();

//Importing controllers frm controller folder for userControls and productControls
const {addProduct,getAllProducts,getProductById,getProductByName,updateProduct,deleteProduct, getProductByCategory, getProductCategories} = require("../controller/productController");

//Importing sanityMiddleWare from midddle wares
const {payLoadSanity} = require("../middlewares/sanityOfPayload");

prodRouter.route("/").post(payLoadSanity,addProduct).get(getAllProducts);
prodRouter.route("/:id").get(getProductById).patch(updateProduct).delete(deleteProduct);
prodRouter.route("/name/:name").get(getProductByName);
prodRouter.route("/category/:category").get(getProductByCategory);
prodRouter.route("/categories/product_categories").get(getProductCategories);

module.exports = prodRouter;


