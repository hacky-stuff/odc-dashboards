import { Command } from "commander";
import list from './list'
import sync from './sync'

const command = new Command()
  .name("jira")
  .addCommand(list)
  .addCommand(sync);

export default command;
