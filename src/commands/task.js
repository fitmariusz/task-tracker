import inquirer from 'inquirer';

import taskService from '../services/taskService.js';
import {isDateInvalid, isTaskInvalid} from '../../validation.js';
import {selectAllProjects} from './project.js';

const createTask = async () => {
  const {title} = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Insert task title',
      validate: input => {
        let resp;
        if ((resp = isTaskInvalid(input))) return resp;

        return true;
      },
    },
  ]);

  const projects = await selectAllProjects();
  const choices = projects.map(({name}) => name);

  const {name} = await inquirer.prompt([
    {
      type: 'list',
      name: 'name',
      message: 'Select project',
      choices: choices,
    },
  ]);

  const project = projects.find(c => c.name === name);

  // Get current date and time
  const now = new Date();
  const date = now.toISOString().split('T')[0]; // format YYYY-MM-DD
  const time = now.toTimeString().split(' ')[0].slice(0, 5); // format HH:mm
  const startDefault = `${date} ${time}`;

  // Prompt for start and end dates with time
  const {start, end} = await inquirer.prompt([
    {
      type: 'input',
      name: 'start',
      message: 'Enter start date and time (YYYY-MM-DD HH:mm)',
      default: startDefault,
      validate: input => {
        let resp;
        if ((resp = isDateInvalid(input)))
          return 'Please enter a valid date and time in the format YYYY-MM-DD HH:mm';

        return true;
      },
    },
    {
      type: 'input',
      name: 'end',
      message: 'Enter end date and time (YYYY-MM-DD HH:mm)',
      validate: input => {
        let resp;
        if ((resp = isDateInvalid(input)))
          return 'Please enter a valid date and time in the format YYYY-MM-DD HH:mm';
        // TODO: validate if end date is after start date

        return true;
      },
    },
  ]);

  await taskService.create(start, end, title, project.id);
};

export {createTask};
