const repositoryService = require("../services/repositories.services");
const githubAPi = require("../utility/githubApi");
const responseManager = require("../utility/responseManager");
const controller = async (request, h) => {
  try {
    const query = request.query;
    if (!request.query?.q)
      return responseManager.error(
        h,
        "Validation Failed",
        [
          {
            resource: "Search",
            field: "q",
            code: "missing",
          },
        ],
        500
      );
    const searchData = await handleRepositories(request.query);
    // const gitData = await githubAPi.searchRepositories(request.query);
    // await handleInsertRepositoriesSearch(gitData.items);
    // const searchData = await handleSearchRepositoriesSearch(request.query);
    return responseManager.success(
      h,
      "Repositories Search data fetched",
      searchData
    );
  } catch (error) {
    console.log("error is", error);
    if (error.code == 11000) {
      return responseManager.error(h, error.message, {}, 409);
    }
    return responseManager.error(h, error, { ...error, name: error.name }, 500);
  }
};
const handleRepositories = async (query) => {
  try {
    console.log(query);
    const gitData = await githubAPi.searchRepositories(query);
    await handleInsertRepositoriesSearch(gitData.items);
    const searchData = await handleSearchRepositoriesSearch(query);
    return searchData;
  } catch (error) {
    console.log("error in handleRepositories", error);
    return [];
  }
};
const handleInsertRepositoriesSearch = async (gitData) => {
  try {
    let newArr = [];
    gitData.map((item) => {
      newArr.push({
        repository_id: item.id,
        owner: item.owner.login,
        full_name: item.full_name,
        description: item.description,
        html_url: item.html_url,
        language: item.language,
        stargazers_count: item.stargazers_count,
      });
    });
    const result = await repositoryService.insert(newArr);
    // const result = await repositoryService.update(full_name, newArr);
    // console.log("result", result);
    return true;
  } catch (error) {
    console.log("error", error);
    return false;
  }
};

const handleSearchRepositoriesSearch = async (query) => {
  try {
    console.log("query", query.q);
    return await repositoryService.search(query.q);
  } catch (error) {
    console.log("error in search", error);
    return false;
  }
};
const getById = async (request, h) => {
  const res = await repositoryService.getById(request.params.id);
  return responseManager.success(h, "Repository Data", res);
};
const getFullName = async (request, h) => {
  const { owner, name } = request.params;
  const res = await repositoryService.getByFullName(`${owner}/${name}`);
  return responseManager.success(h, "Repository Data", res);
};
module.exports = { controller, handleRepositories, getById, getFullName };
