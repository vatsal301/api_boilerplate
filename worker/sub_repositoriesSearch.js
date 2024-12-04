const { Redis } = require("ioredis");
const subscribeClient = new Redis();
const repositoriesSearch = require("../controllers/repositoriesSearch.controller");
// const sub_contribution = require("./sub_contribution");
const channelName = "github";

const publishClient = new Redis();
const channelName2 = "github_contribution";

const repositoriesSearchSub = async () => {
  subscribeClient.subscribe(channelName, (error, count) => {
    if (error) {
      console.log("error in repositoriesSearchSub", error);
      throw new Error(error);
    }
    console.log(
      `Subscribe to ${count} channel, listening for update on the ${channelName} channel`
    );
  });
  subscribeClient.on("message", async (channelName, message) => {
    console.log(`Received message from ${channelName} channel`);
    const data = JSON.parse(message);
    console.log("message is :", data);
    console.log("message is :", data);
    const searchData = await repositoriesSearch.handleRepositories({
      q: data.query,
    });
    // console.log("searchData is :", searchData);
    // await sub_contribution();
    await publishClient.publish(
      channelName2,
      JSON.stringify(searchData[0].full_name)
    );
  });
  return true;
};
module.exports = repositoriesSearchSub;
