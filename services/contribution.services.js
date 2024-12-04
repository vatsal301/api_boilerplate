const contributionModel = require("../models/contribution.model");

const insert = async (contributionsData) => {
  try {
    return await contributionModel.create(contributionsData);
  } catch (error) {
    console.log("error in contribution create services", error);
    return false;
  }
};
const getById = async (id) => {
  return await contributionModel.aggregate([
    { $match: { repository: id } },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "user_id",
        as: "user",
      },
    },
    {
      $lookup: {
        from: "repositories",
        localField: "repository",
        foreignField: "repository_id",
        as: "repository",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $unwind: "$repository",
    },
  ]);
};
const getByFullName = async (full_name) => {
  return await contributionModel.aggregate([
    {
      $lookup: {
        from: "repositories",
        localField: "repository",
        foreignField: "repository_id",
        as: "repository",
      },
    },
    { $unwind: "$repository" },
    { $match: { "repository.full_name": full_name } },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "user_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
  ]);
  // .explain("executionStats");
};
module.exports = { insert, getById, getByFullName };
