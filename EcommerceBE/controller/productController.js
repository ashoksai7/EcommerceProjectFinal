const {productModel} = require("../models/productModel");

const {addResource,
    getAllResource,
    getResourceById,
    getResourceByName,
    updateResource,
    deleteResource} = require("../utils/resourceFactory");

const addProduct = addResource(productModel);

const getAllProducts = getAllResource(productModel);

const getProductById = getResourceById(productModel);

const getProductByName = getResourceByName(productModel);

const updateProduct= updateResource(productModel);

const deleteProduct = deleteResource(productModel);

module.exports = {
    addProduct,getAllProducts,getProductById,getProductByName,updateProduct,deleteProduct
}
