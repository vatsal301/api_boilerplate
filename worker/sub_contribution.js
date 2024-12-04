const { Redis } = require("ioredis");
const subscribeClient = new Redis();
const repositoriesSearch = require("../controllers/repositoriesSearch.controller");
const channelName2 = "github_contribution";
const contribution = require("../controllers/contribution.controller");
const contributionSub = async () => {
  subscribeClient.subscribe(channelName2, (error, count) => {
    if (error) {
      console.log("error in contributionSub", error);
      throw new Error(error);
    }
    console.log(
      `Subscribe to ${count} channel, listening for update on the ${channelName2} channel`
    );
  });
  subscribeClient.on("message", async (channelName2, message) => {
    console.log(`Received message from ${channelName2} channel`);
    const data = JSON.parse(message);
    const own = data.split("/")[0];
    const repo = data.split("/")[1];
    console.log("message is :", data);
    console.log("own is :", own);
    console.log("repo is :", repo);
    const contributorsData = await contribution.handleContributors(own, repo);
    // console.log("contributorsData is :", contributorsData);
  });
  return true;
};

module.exports = contributionSub;
