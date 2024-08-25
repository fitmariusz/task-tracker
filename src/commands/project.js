import inquirer from 'inquirer';

import projectService from '../services/projectService.js';
import clientService from '../services/clientService.js';
import clientModel from '../models/client.js';

//TODO: validate

const createProject = async () => {
  if (!(await clientModel.isClient())) return;
  // Check client existance
  const clients = await clientService.selectAll();
  // project name create
  const {name} = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the project?',
    },
  ]);

  const choices = clients.map(({name}) => name).concat('Stop');

  const {name: pName} = await inquirer.prompt([
    {
      type: 'list',
      name: 'name',
      message: 'To which client should I attach this?',
      choices: choices,
    },
  ]);
  if (pName === 'Stop') return;

  const client = clients.find(c => c.name === pName);
  // save
  await projectService.create(name, client.id);

};

const selectAllProjects = async () => {
  const projects = await projectService.selectAll();
  console.log(projects.map(d => d.name));
  return projects;
};

const editProject = async () => {
  const data = await projectService.selectAll();
  if (!data.length) return;

  const choices = data.map(({name}) => name);
  const {name} = await inquirer.prompt([
    {
      type: 'list',
      name: 'name',
      message: 'Which one would you like to edit?',
      choices: choices,
    },
  ]);

  const {newName} = await inquirer.prompt([
    {
      type: 'input',
      name: 'newName',
      default: name,
      message: 'New name',
    },
  ]);

  const project = data.find(c => c.name === name);

  await projectService.update(project.id, newName);
};

const deleteProject = async () => {
  const data = await projectService.selectAll();
  if (!data.length) return;
  const choices = data.map(({name}) => name);
  const {name} = await inquirer.prompt([
    {
      type: 'list',
      name: 'name',
      message: 'Which one would you like to delete?',
      choices: choices,
    },
  ]);

  const project = data.find(c => c.name === name);

  await projectService.delete(project);
};

export {createProject, selectAllProjects, editProject, deleteProject};
