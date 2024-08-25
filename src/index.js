#!/usr/bin/env node

import {program} from 'commander';
import inquirer from 'inquirer';

import {
  createClient,
  deleteClient,
  editClient,
  selectAllClients,
} from './commands/client.js';
import {
  createProject,
  editProject,
  selectAllProjects,
} from './commands/project.js';
import {
  createTask,
  deleteTask,
  editTask,
  selectAllTasks,
} from './commands/task.js';

program.version('1.0.0');

const mappedActions = {
  'Add task': createTask,
  'Edit task': editTask,
  'Show tasks': selectAllTasks,
  'Delete tasks': deleteTask,
  'Add client': createClient,
  'Edit client': editClient,
  'Show clients': selectAllClients,
  'Delete client': deleteClient, // TODO:add prop handling
  'Add project': createProject,
  'Edit project': editProject,
  'Show projects': selectAllProjects,
  Exit: () => {
    process.exit();
  },
};

const actions = [
  {
    type: 'list',
    name: 'action',
    message: 'Choose what you would like to do.',
    choices: Object.keys(mappedActions),
  },
];

const main = async () => {
  try {
    while (true) {
      const {action} = await inquirer.prompt(actions);
      const func = mappedActions[action];
      if (!func) throw new Error('Action not recognized');

      console.log(`Executing ${func.name}...`);
      await func();
    }
  } catch (err) {
    console.error('An error occurred:', err);
  }
};

main(program.parse(process.argv));
