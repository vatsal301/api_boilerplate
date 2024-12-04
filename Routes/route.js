const repositoriesSearch = require("../controllers/repositoriesSearch.controller");
const contribution = require("../controllers/contribution.controller");
const { failAction } = require("../utility/responseManager");
const triggerValidation = require("../validations/trigger.validation");
const requestValidation = require("../validations/request.validation");
const triggerController = require("../controllers/trigger.controller");
const memberController = require("../controllers/member.controller");
const memberValidation = require("../validations/member.validation");
const allRoute = [
  {
    method: "POST",
    path: "/api/v1/login",
    options: {
      validate: {
        payload: memberValidation.loginSchema,
      },
    },
    handler: memberController.login,
  },
  {
    method: "POST",
    path: "/api/v1/signin",
    options: {
      validate: {
        payload: memberValidation.createSchema,
        failAction: failAction,
      },
    },
    handler: memberController.signin,
  },
  {
    method: "GET",
    path: "/logout",
    handler: (request, h) => {
      return h.response("Hello Node.js!");
    },
  },
  {
    method: "GET",
    path: "/repositories/search",
    handler: repositoriesSearch.controller,
  },
  {
    method: "GET",
    path: "/contributors/search/{own}/{repo}",
    handler: contribution.controller,
  },
  {
    method: "GET",
    path: "/api/v1/repository/{id}",
    options: {
      validate: {
        params: requestValidation.requestIdSchema,
        failAction: failAction,
      },
    },
    handler: repositoriesSearch.getById,
  },
  {
    method: "GET",
    path: "/api/v1/repository/{owner}/{name}",
    options: {
      validate: {
        params: requestValidation.requestFullNameSchema,
        failAction: failAction,
      },
    },
    handler: repositoriesSearch.getFullName,
  },
  {
    method: "GET",
    path: "/api/v1/repository/{id}/contributions",
    options: {
      validate: {
        params: requestValidation.requestIdSchema,
        failAction: failAction,
      },
    },
    handler: contribution.getById,
  },
  {
    method: "GET",
    path: "/api/v1/repository/{owner}/{name}/contributions",
    options: {
      validate: {
        params: requestValidation.requestFullNameSchema,
        failAction: failAction,
      },
    },
    handler: contribution.getFullName,
  },
  {
    method: "POST",
    path: "/api/v1/trigger",
    options: {
      validate: {
        payload: triggerValidation.searchSchema,
        failAction: failAction,
      },
    },
    handler: triggerController,
  },
];

module.exports = allRoute;
