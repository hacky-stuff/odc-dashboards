import { Command } from "commander";
import jira from './jira'

new Command()
  .name("cli")
  .addCommand(jira)
  .parse();
