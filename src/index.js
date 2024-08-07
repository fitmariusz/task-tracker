import {program} from 'commander';
import inquirer from 'inquirer';

program.version('1.0.0');

const actions = [
  {
    type: 'list',
    name: 'action',
    message: 'Select what you want to do',
    choices: ['Add owner'],
  },
];

const main = async () => {
  const {action} = await inquirer.prompt(actions);
};

main(program.parse(process.argv));
