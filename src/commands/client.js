import * as inquirer from '@inquirer/prompts';

import clientService from '../services/clientService.js';
import {isClientInvalid} from '../../validation.js';


const createClient = async () => {
  const name = await inquirer.input({
    message: 'What is the client name?',
    validate: input => {
      if (input.toLowerCase() === 'exit') {
        console.log('Exiting the process...');
        process.exit(); // TODO: add prpper handling when user what to stop action, whole app
      }
      let resp;
      if ((resp = isClientInvalid(input))) return resp;

      return true;

    },

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

  // const variants = {yes, no};
  // const decision = variants
  // .map(({name}) => ({name, value: name}));

  // const test = await inquirer.search({
  //   message: 'Which to delete?',
  //   source: input =>
  //     input
  //       ? choices.filter(choice =>
  //           choice.toLowerCase().includes(input.toLowerCase()),
  //         )
  //       : choices,
  // });
  const decision = await inquirer.input({
    default: 'no',
    message: `Are you sure to delete client: ${name} ? (yes/no)`,
    
  });
  
  if(decision.toLowerCase()==='yes')
  {
    const resp = await clientService.delete(clients.find(c => c.name === name));
    return resp;
  }
  
  return true;
  
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
    validate: input => {
      if (input.toLowerCase() === 'exit') {
        console.log('Exiting the process...');
        process.exit(); // TODO: add prpper handling when user what to stop action, whole app
      }
      let resp;
      if ((resp = isClientInvalid(input))) return resp;

      return true;

    },
  });

  const client = data.find(c => c.name === name);

  await clientService.update(client.id, newName);
};

export {createClient, selectAllClients, deleteClient, editClient};
