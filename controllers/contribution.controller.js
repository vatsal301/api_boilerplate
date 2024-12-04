const githubAPi = require("../utility/githubApi");
const responseManager = require("../utility/responseManager");
const { getRepoByFullName } = require("../services/repositories.services");
const userInsertService = require("../services/user.services").insert;
const contributionService = require("../services/contribution.services");

const controller = async (request, h) => {
  try {
    const params = request.params;
    if (!params?.own && !params?.repo)
      return h.response({
        message: "Validation Failed",
        errors: [
          {
            resource: "Search",
            field: "own or repo",
            code: "missing",
          },
        ],
      });
    const { own, repo } = request.params;
    const contributions = await handleContributors(own, repo);
    return h.response(contributions);
  } catch (error) {
    console.log("error is", error);
    return error;
  }
};

const handleContributors = async (own, repo) => {
  try {
    const gitData = await githubAPi.getContributorCommit(own, repo);
    if (!gitData || !gitData.length) {
      console.log("No contribution stats available.");
      return [];
    }
    let repoId = await getRepoByFullName(`${own}/${repo}`);
    // console.log("repoId", repoId);
    let userPayload = [];
    const contributions = gitData.map((contributor) => {
      const totalAdditions = contributor.weeks.reduce(
        (sum, week) => sum + week.a,
        0
      );
      userPayload.push({
        user_id: contributor.author.id,
        login: contributor.author.login,
        avatar_url: contributor.author.avatar_url,
        html_url: contributor.author.html_url,
        type: contributor.author.type,
      });
      return {
        user: contributor.author.id,
        repository: repoId.repository_id,
        line_count: totalAdditions,
      };
    });
    userInsertService(userPayload);
    contributionService.insert(contributions);
    return contributions;
  } catch (error) {
    console.log("error in handleContributors", error);
    return [];
  }
};

const getById = async (request, h) => {
  const res = await contributionService.getById(request.params.id);
  return responseManager.success(h, "Contribution Data", res);
};
const getFullName = async (request, h) => {
  const { owner, name } = request.params;
  const res = await contributionService.getByFullName(`${owner}/${name}`);
  // const result = JSON.stringify(res, null, 2);
  // console.log("result", result);
  return responseManager.success(h, "Contribution Data", res);
};
module.exports = { controller, handleContributors, getById, getFullName };
