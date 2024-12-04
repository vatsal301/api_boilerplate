const UserServices = require("../services/user.services");
const githubAPi = require("../utility/githubApi");
const responseManager = require("../utility/responseManager");
async function createUserHandlerUsingGithubApi(request, h) {
  try {
    const gitData = await githubAPi.getUserWithGithubApi();
    const payload = {
      user_id: gitData.id,
      login: gitData.login,
      avatar_url: gitData.avatar_url,
      html_url: gitData.html_url,
      type: gitData.type,
    };
    const data = await UserServices.insert(payload);
    return responseManager.success(h, "User created", data, 201);
  } catch (error) {
    let message = "";
    if (error.name === "ValidationError") {
      message = "Validation failed";
      const validationErrors = Object.values(error.errors).map((err) => ({
        field: err.path,
        message: err.message,
      }));
      return responseManager.validationError(h, message, validationErrors, 400);
    }

    if (error.code === 11000) {
      let duplicateField = Object.keys(error.keyValue)[0];
      message = `${duplicateField} is already exists`;
      return responseManager.error(h, message, {}, 409);
    }
    message = `Server error occurred during 'createUserHandler' deletion: ${error.message}`;
    return responseManager.error(
      h,
      message,
      { ...error, name: error.name },
      500
    );
  }
}

async function getUserGithubApi(request, h) {
  try {
    const data = await githubAPi.getUserWithGithubApi();
    return responseManager.success(h, "User data fetched", data);
  } catch (error) {
    console.log("error is", error);
    message = `Server error occurred during 'getUserGithubApi' deletion: ${error.message}`;
    return responseManager.error(
      h,
      message,
      { ...error, name: error.name },
      500
    );
  }
}

function getUserData(request, h) {
  try {
    const data = UserServices.getUser(request.query.id || request.query.login);
    return responseManager.success(h, "User data fetched", data);
  } catch (error) {
    console.log("error is", error);
    message = `Server error occurred during 'getUserData' deletion: ${error.message}`;
    return responseManager.error(
      h,
      message,
      { ...error, name: error.name },
      500
    );
  }
}

module.exports = {
  getUserGithubApi,
  createUserHandlerUsingGithubApi,
  getUserData,
};
