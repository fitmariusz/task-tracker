import {program} from 'commander';
import inquirer from 'inquirer';

import {createOnwer} from './commands/owner.js';

program.version('1.0.0');

const actions = [
  {
    type: 'list',
    name: 'action',
    message: 'Select what you want to do',
    choices: ['Add owner'],
  },
];

const mappedActions = {
  'Add owner': createOnwer,
};

const main = async () => {
  const {action} = await inquirer.prompt(actions);
  let funct;
  if (!(funct = mappedActions[action])) throw 'no_action';
  await funct();

  // loop back
  main()
};

main(program.parse(process.argv));
