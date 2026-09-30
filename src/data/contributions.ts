export type Contribution = {
  project: string;
  repo: string;
  repoUrl: string;
  title: string;
  /** Link to the commit, not the PR — see the note below. */
  commitUrl: string;
  sha: string;
  /** Date the maintainer landed it upstream. */
  landedAt: string;
  branches: string[];
  filesChanged: number;
  additions: number;
  deletions: number;
  maintainer: string;
  summary: string;
};

/**
 * Upstream contributions, verified against the GitHub API rather than taken
 * from a pull-request list.
 *
 * The distinction matters. Spring maintainers rebase contributions in rather
 * than using GitHub's merge button, so the pull request is recorded as
 * `closed` with `merged: false` even though the commit is in main. Rendering
 * such a contribution by its PR state would label it "closed", which reads as
 * rejected. The commit is the honest primary evidence: authored by him,
 * committed by a maintainer, present in the branch history.
 */
export const contributions: Contribution[] = [
  {
    project: "Spring AI",
    repo: "spring-projects/spring-ai",
    repoUrl: "https://github.com/spring-projects/spring-ai",
    title: "Close the resource stream in PDF document readers",
    commitUrl:
      "https://github.com/spring-projects/spring-ai/commit/ecb2de2bfc8f0472fcd35703fa1b979260ac31c1",
    sha: "ecb2de2",
    landedAt: "2026-09-29",
    branches: ["main", "2.0.x"],
    filesChanged: 4,
    additions: 63,
    deletions: 6,
    maintainer: "Soby Chacko",
    summary:
      "Fixed a resource leak in the PDF document readers — the underlying stream was left open after parsing. Landed with tests, on both the development line and the 2.0.x maintenance branch.",
  },
];
