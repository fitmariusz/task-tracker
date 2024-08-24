import inquirer from 'inquirer';

import projectService from '../services/projectService.js';
import clientService from '../services/clientService.js';

//TODO: validate

const createProject = async () => {
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

  console.log(await projectService.selectAll());
};

const selectAllProjects = async () => {
  const projects = await projectService.selectAll();
  console.log(projects.map(d => d.name));
  return projects;
};

const editProject = async () => {
  const data = await projectService.selectAll();
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

// TODO: Add delete command when tasks operations are done

export {createProject, selectAllProjects, editProject};
