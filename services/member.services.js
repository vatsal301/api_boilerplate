const memberModel = require("../models/member.model");

async function insert(data) {
  try {
    return await memberModel.create(data);
  } catch (error) {
    console.log("error in memberModel insert services ", error.message);
    return false;
  }
}
const checkByEmail = async (email) => {
  return await memberModel.findOne({ email: email });
};
async function findMember(data) {
  return await memberModel.find({ email: data.email }).lean();
}
async function findByIdMember(id) {
  return await memberModel.findById(id).lean();
}

module.exports = { insert, checkByEmail, findByIdMember };
