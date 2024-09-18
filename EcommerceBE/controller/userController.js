//Importing userModel from models
const {userModel} = require("../models/userModel");
const {addResource,
    getAllResource,
    getResourceById,
    getResourceByName,
    updateResource,
    deleteResource} = require("../utils/resourceFactory");

const addUser = addResource(userModel);
const getUsers = getAllResource(userModel);
const getUserById = getResourceById(userModel);
const getUserByName = getResourceByName(userModel);
const updateUser = updateResource(userModel);
const deleteUser = deleteResource(userModel);

module.exports = {
    addUser,getUsers,getUserById,getUserByName,updateUser,deleteUser
}