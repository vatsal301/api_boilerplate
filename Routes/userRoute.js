const UserController = require("../controllers/user.controller");
const { failAction } = require("../utility/responseManager");
const { createSchema, getSchema } = require("../validations/user.validation");
const userRoute = [
  {
    method: "GET",
    path: "/user",
    options: {
      validate: { query: getSchema, failAction: failAction },
    },
    handler: UserController.getUserData,
  },
  {
    method: "GET",
    path: "/user/github",
    handler: UserController.getUserGithubApi,
  },
  {
    method: "POST",
    path: "/user/create",
    // options: {
    //   validate: { payload: createSchema, failAction: failAction },
    // },
    handler: UserController.createUserHandlerUsingGithubApi,
  },
];

module.exports = userRoute;
