const repositoryModel = require("../models/repository.model");

const insert = async (repoData) => {
  // console.log("repoData", repoData);

  return await repositoryModel.create(repoData);
};

const update = async (full_name, newArr) => {
  return await repositoryModel.updateMany({ full_name: full_name }, newArr, {
    upsert: true,
  });
};
const getById = async (id) => {
  return await repositoryModel.findOne({ repository_id: id }).lean();
};
const getByFullName = async (full_name) => {
  return await repositoryModel.findOne({ full_name: full_name }).lean();
};
const getRepoByFullName = async (full_name) => {
  return await repositoryModel
    .findOne({ full_name: full_name }, { repository_id: 1, _id: 0 })
    .lean();
};
const search = async (query) => {
  const regex = new RegExp(`\\b${query}`, "i");
  return await repositoryModel.find({
    $or: [{ full_name: regex }, { description: regex }],
  });
};

module.exports = { insert, update, getRepoByFullName, search, getById, getByFullName };
