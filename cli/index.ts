import { Command } from "commander";
import github from './github'
import jira from './jira'

new Command()
  .name("cli")
  .addCommand(github)
  .addCommand(jira)
  .parse();
