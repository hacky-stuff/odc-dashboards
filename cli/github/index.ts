import * as chalk from 'chalk';
import { Command } from "commander";
import { Octokit } from "octokit";

const command = new Command()
  .name("github")
  .action(async () => {
    const octokit = new Octokit();

    const iterator = octokit.paginate.iterator(
      octokit.rest.issues.listForRepo,
      {
        owner: "openshift",
        repo: "console",
        per_page: 100,
        // state: 'all',
      }
    );

    // iterate through each response
    let issueCount = 0;
    for await (const { data: issues } of iterator) {
      for (const issue of issues) {
        console.log("Issue #%d: %s", issue.number, issue.title);
        issueCount++;
      }
    }

    console.log('issueCount', issueCount);
  });

export default command;
