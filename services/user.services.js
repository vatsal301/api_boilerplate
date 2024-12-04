const UserModel = require("../models/user.model");

async function insert(data) {
  try {
    return await UserModel.create(data);
  } catch (error) {
    console.log("error in user insert services ", error.message);
    return false;
  }
}

async function getUser(id) {
  return await UserModel.find({ $or: [{ id: id }, { login: id }] }).lean();
}

module.exports = { insert, getUser };
