const axios = require("axios");

const searchRepositories = async (query) => {
  console.log("process.env.TOKEN");
  console.log(process.env.TOKEN);
  // https://api.github.com/search/repositories?q=javascript
  const res = await axios.get("https://api.github.com/search/repositories", {
    params: query,
    headers: {
      Authorization: process.env.TOKEN,
    },
  });
  return res.data;
};
const getContributorCommit = async (own, repo) => {
  // https://api.github.com/repos/TheAlgorithms/JavaScript/contributors
  const res = await axios.get(
    `https://api.github.com/repos/${own}/${repo}/stats/contributors`,
    {
      headers: {
        Authorization: process.env.TOKEN,
      },
    }
  );
  // console.log("res in git", res.data);
  return res.data;
};
// const getContributorCommit = async (own, repo) => {
//   // https://api.github.com/repos/TheAlgorithms/JavaScript/contributors
//   const res = await axios.get(
//     `https://api.github.com/repos/${own}/${repo}/stats/contributors`,
//     {
//       headers: {
//         Authorization: process.env.TOKEN,
//       },
//     }
//   );
//   if (!res.data || !res.data.length) {
//     console.log("No contribution stats available.");
//     return [];
//   }
//   let repoId = await getRepoByFullName(`${own}/${repo}`);
//   console.log("repoId", repoId);
//   let userPayload = [];
//   const contributions = res.data.map((contributor) => {
//     const totalAdditions = contributor.weeks.reduce(
//       (sum, week) => sum + week.a,
//       0
//     );
//     userPayload.push({
//       user_id: contributor.author.id,
//       login: contributor.author.login,
//       avatar_url: contributor.author.avatar_url,
//       html_url: contributor.author.html_url,
//       type: contributor.author.type,
//     });
//     return {
//       user: contributor.author.id,
//       repository: repoId.repository_id,
//       line_count: totalAdditions,
//       // totalAdditions,
//       // totalDeletions,
//       // totalCommits: contributor.total,
//     };
//   });
//   userInsertService(userPayload);
//   contributionInsertService(contributions);
//   return contributions;
// };
const getUserWithGithubApi = async () => {
  const res = await axios.get(`https://api.github.com/user`, {
    headers: {
      Authorization: process.env.TOKEN,
    },
  });
  return res.data;
};
// const getContributors = async (own, repo) => {
//   // https://api.github.com/repos/TheAlgorithms/JavaScript/contributors
//   const res = await axios.get(
//     `https://api.github.com/repos/${own}/${repo}/contributors`,
//     {
//       headers: {
//         Authorization: process.env.TOKEN,
//       },
//     }
//   );
//   return res.data;
// };
module.exports = {
  searchRepositories,
  getUserWithGithubApi,
  getContributorCommit,
  // getContributors,
};
