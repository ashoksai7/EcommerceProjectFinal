const {productModel} = require("../models/productModel");

const {addResource,
    getAllResource,
    getResourceById,
    getResourceByName,
    getResourceByCategory,
    getResourceCategories,
    updateResource,
    deleteResource
} = require("../utils/resourceFactory");

const addProduct = addResource(productModel);

const getAllProducts = getAllResource(productModel);

const getProductById = getResourceById(productModel);

const getProductByName = getResourceByName(productModel);

const getProductByCategory = getResourceByCategory(productModel);

const getProductCategories = getResourceCategories(productModel);

const updateProduct= updateResource(productModel);

const deleteProduct = deleteResource(productModel);

module.exports = {
    addProduct,getAllProducts,getProductById,getProductByName,getProductByCategory,getProductCategories,updateProduct,deleteProduct
}
