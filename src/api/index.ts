import axios from "axios";
import {
  CombinedContributionResponse,
  IndividualContributionResponse,
} from "../types/ContributionTypes";

const { get } = axios.create({
  baseURL: "https://contribution-api.herokuapp.com/",
});

export const ContributionApi = {
  getCombinedContributions: (params: CombinedContributionsParams) =>
    get<CombinedContributionResponse>("/contributions", { params }),

  getGitlabContributions: (gitlabUsername: GitlabUsername) =>
    get<IndividualContributionResponse<"Gitlab">>(
      `/gitlab/${gitlabUsername}/contributions`
    ),

  getGithubContributions: (githubUsername: GithubUsername) =>
    get<IndividualContributionResponse<"Github">>(
      `/github/${githubUsername}/contributions`
    ),
};

type GithubUsername = string;
type GitlabUsername = string;

type CombinedContributionsParams = {
  githubUsername: GithubUsername;
  gitlabUsername: GitlabUsername;
};
