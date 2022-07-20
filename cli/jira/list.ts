import * as chalk from 'chalk';
import { Command } from "commander";
import * as JiraApi from 'jira-client';

const colors: Record<string, chalk.Chalk> = {
  'blue-gray': chalk.blueBright,
  'green': chalk.green,
  'yellow': chalk.yellow,
};

const formatKey = (issue) => chalk.white(issue.key);
const formatStatus = (issue) => {
  const status = issue.fields.status;
  const colorName = status.statusCategory.colorName;
  const label = status.statusCategory.name;
  if (!colors[colorName]) {
    throw new Error(`Unknown color name ${colorName}`)
  }
  return colors[colorName]?.(label) ?? label;
};
const formatSummary = (issue) => issue.fields.summary;

const command = new Command()
  .name("list")
  .action(async () => {
    const jira = new JiraApi({
      protocol: 'https',
      host: 'issues.redhat.com/',
      strictSSL: true,
    });
    
    console.log('Fetch all ' + chalk.blue('4.12 Epics'));
    
    let startAt = 0;
    const maxResults = 50;

    for (let index = 0; index < 3; index++) {
      const searchResult = await jira.searchJira(
        'project = ODC AND type = Epic ORDER BY key',
        { startAt, maxResults },
      );
      const issues = searchResult.issues;
      delete searchResult.issues;
      startAt += issues.length;

      console.log('searchResult', searchResult);
      
      issues.forEach((issue) => {
        console.log(`${formatKey(issue)} ${formatStatus(issue)} ${formatSummary(issue)}`);
      });
    }
  });

export default command;
