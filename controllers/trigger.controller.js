const { Redis } = require("ioredis");
const publishClient = new Redis();
const channelName = "github";
// const subRepositories = require("../worker/sub_repositoriesSearch");
const responseManager = require("../utility/responseManager");
module.exports = async (request, h) => {
  try {
    // await subRepositories();
    await publishClient.publish(channelName, JSON.stringify(request.payload));
    return responseManager.success(h, "published");
  } catch (error) {
    console.log("error is", error);
    return error;
  }
};
