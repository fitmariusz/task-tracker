import inquirer from 'inquirer';

import clientService from '../services/clientService.js';

const createClient = async () => {
  const {name} = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is client name?',
    },
  ]);
  await clientService.create(name);
  return;
};

const selectAllClients = async () => {
  const data = await clientService.selectAll();
  console.log(data.map(o => o.name));
  return data;
};

const deleteClient = async () => {
  const data = await selectAllClients();
  const choices = data.map(({name}) => name).concat('Stop');

  const {name} = await inquirer.prompt([
    {
      type: 'list',
      name: 'name',
      message: 'Which to delete?',
      choices: choices,
    },
  ]);

  if (name === 'Stop') return;

  const resp = await clientService.delete(name);
  console.log(resp);
};

const editClient = async () => {
  const data = await clientService.selectAll();
  const choices = data.map(({name}) => name);
  const {name} = await inquirer.prompt([
    {
      type: 'list',
      name: 'name',
      message: 'Whom do you want to edit?',
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

  const client = data.find(c => c.name === name);

  await clientService.update(client.id, newName);
};

export {createClient, selectAllClients, deleteClient, editClient};
