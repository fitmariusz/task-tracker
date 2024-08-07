import ownerService from '../services/ownerService.js';
import inquirer from 'inquirer';

const createOnwer = async data => {
  const {name} = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is onwer name?',
    },
  ]);
  await ownerService.create(name);
};

export {createOnwer};
