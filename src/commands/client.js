import * as inquirer from '@inquirer/prompts';

import clientService from '../services/clientService.js';

const createClient = async () => {
  const name = await inquirer.input({
    message: 'What is the client name?',
  });
  if (!name) return;
  await clientService.create(name);
  return;
};

const selectAllClients = async () => {
  const data = await clientService.selectAll();
  console.log(data.map(o => o.name));
  return data;
};

const deleteClient = async () => {
  const clients = await selectAllClients();
  const choices = clients
    .map(({name}) => ({name, value: name}))
    .concat({name: 'Stop', value: 'Stop'});

  const name = await inquirer.search({
    message: 'Which to delete?',
    source: input =>
      input
        ? choices.filter(choice =>
            choice.toLowerCase().includes(input.toLowerCase()),
          )
        : choices,
  });

  if (name === 'Stop') return;

  const resp = await clientService.delete(clients.find(c => c.name === name));

  return resp;
};

const editClient = async () => {
  const data = await clientService.selectAll();
  if (!data.length) return;
  const name = await inquirer.search({
    message: 'Whom do you want to edit?',
    source: input => {
      const choices = data
        .map(({name}) => name)
        .map(f => ({
          name: f,
          value: f,
        })).concat({name: 'Stop', value: 'Stop'});
      if (!input) return choices;
      return choices.filter(choice =>
        choice.name.toLowerCase().includes(input.toLowerCase()),
      );
    },
  });

  if (name === 'Stop') return;

  const newName = await inquirer.input({
    default: name,
    message: 'New name?',
  });

  const client = data.find(c => c.name === name);

  await clientService.update(client.id, newName);
};

export {createClient, selectAllClients, deleteClient, editClient};
