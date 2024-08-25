import cliModel from '../models/client.js';
import projectModel from '../models/project.js';
import task from '../models/task.js';

const clientService = {
  create: data => {
    return cliModel.create(data);
  },
  selectAll: () => {
    return cliModel.listAll();
  },

  delete: async client => {
    const projects = await projectModel.selectByCliId(client.id);

    // remove tasks
    for (const project of projects) {
      await task.delete({col: 'project_id', val: project.id});
      // remove projectes
      await projectModel.delete({col: 'id', value: project.id});
    }

    return cliModel.delete(client.name);
  },

  update: (id, name) => {
    return cliModel.edit(id, name);
  },
};

export default clientService;
