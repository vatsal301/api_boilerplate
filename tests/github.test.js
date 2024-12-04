const nock = require("nock");
const { expect } = require("chai");
const githubApi = require("../utility/githubApi");
const axios = require("axios");
// tests/github.test.js
const { searchRepositories, getContributors } = require("../utility/githubApi");

describe("GitHub API Utility Functions", () => {
  const token = "token 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"; // Replace with your actual token for testing

  beforeEach(() => {
    process.env.TOKEN = token; // Set the environment variable for the token
  });

  afterEach(() => {
    nock.cleanAll(); // Clean all nocks after each test
  });

  it("searchRepositories - should search for repositories", async () => {
    const query = { q: "language:javascript" };
    const mockResponse = {
      total_count: 1,
      items: [
        {
          id: 123,
          name: "mock-repo",
          full_name: "owner/mock-repo",
        },
      ],
    };

    // Intercept the GET request to GitHub API
    nock("https://api.github.com")
      .get("/search/repositories")
      .query(query)
      .reply(200, mockResponse);

    const response = await searchRepositories(query);
    expect(response).to.deep.equal(mockResponse);
  });

  it("getContributors - should get contributors list", async () => {
    const owner = "owner";
    const repo = "mock-repo";
    const mockResponse = [
      {
        login: "contributor1",
        contributions: 5,
      },
      {
        login: "contributor2",
        contributions: 10,
      },
    ];

    // Intercept the GET request to GitHub API
    nock("https://api.github.com")
      .get(`/repos/${owner}/${repo}/contributors`)
      .reply(200, mockResponse);

    const response = await getContributors(owner, repo);
    expect(response).to.deep.equal(mockResponse);
  });
  it("getUserData - should get user data", async () => {
    const mockResponse = {
      login: "vatsal301",
      id: 83639917,
      node_id: "MDQ6VXNlcjgzNjM5OTE3",
    };
    nock("https://api.github.com", {
      reqheaders: {
        Authorization: "token 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",
      },
    })
      .get("/user")
      .reply(200, mockResponse);
    const response = await githubApi.getUserData();
    expect(response).to.deep.equal(mockResponse);
  });
});
