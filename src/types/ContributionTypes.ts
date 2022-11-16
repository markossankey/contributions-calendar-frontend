type sources = "Gitlab" | "Github";

export interface IndividualContributionResponse<T extends sources> {
  username: string;
  source: T;
  totalContributions: number;
  contributions: Contribution[];
}

export interface CombinedContributionResponse {
  githubUsername: string;
  gitlabUsername: string;
  totalContributions: number;
  combinedContributions: Contribution[];
}

export interface Contribution {
  count: number;
  date: string;
}
