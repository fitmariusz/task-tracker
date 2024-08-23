import inquirer from 'inquirer';
import {selectAllProjects} from './project.js';
import taskService from '../services/taskService.js';

const createTask = async () => {
  const {title} = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Insert task title',
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
        // TODO: replace with yup/joi validation
        return /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(input)
          ? true
          : 'Please enter a valid date and time in the format YYYY-MM-DD HH:mm';
      },
    },
    {
      type: 'input',
      name: 'end',
      message: 'Enter end date and time (YYYY-MM-DD HH:mm)',
      validate: input => {
        // TODO: replace with yup/joi validation
        return /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(input)
          ? true
          : 'Please enter a valid date and time in the format YYYY-MM-DD HH:mm';
      },
    },
  ]);

  await taskService.create(start, end, title, project.id);
};

export {createTask};
