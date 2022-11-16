import axios from "axios";

const { get } = axios.create({ baseURL: "http://localhost:3000" });

export const ContributionApi = {
  getCombinedContributions: (params: CombinedContributionsParams) =>
    get("/contributions", { params }),

  getGitlabContributions: (gitlabUsername: GitlabUsername) =>
    get(`/gitlab/${gitlabUsername}/contributions`),

  getGithubContributions: (githubUsername: GithubUsername) =>
    get(`/github/${githubUsername}/contributions`),
};

type GithubUsername = string;
type GitlabUsername = string;

type CombinedContributionsParams = {
  githubUsername: GithubUsername;
  gitlabUsername: GitlabUsername;
};
