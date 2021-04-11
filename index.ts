import * as core from "@actions/core";
import * as github from "@actions/github";

const token: string = core.getInput("token");
const label: string = core.getInput("label");

const octokit = github.getOctokit(token);

async function run() {
  const prs = await octokit.pulls
    .list({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
    })
    .then((r) => r.data);

  console.log(prs);
  const prsWirthLabel = prs.filter((pr) =>
    pr.labels.find(({ name }) => name === label)
  );

  const output = prsWirthLabel.map((pr) => pr.html_url).join("\n");
  core.setOutput("prs", output);
}

run();
