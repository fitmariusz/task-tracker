import cliModel from '../models/client.js';

const clientService = {
  create: data => {
    return cliModel.create(data);
  },
  selectAll: () => {
    return cliModel.listAll();
  },

  delete: name => {
    return cliModel.delete(name);
  },

  update: (id, name) => {
    return cliModel.edit(id, name);
  },
};

export default clientService;
