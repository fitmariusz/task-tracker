import projectModel from '../models/project.js';

const projectService = {
  create: (name, clientId) => {
    return projectModel.create(name, clientId);
  },

  selectAll: () => {
    return projectModel.listAll();
  },

  delete: name => {
    // TODO: delete tasks
    return projectModel.delete(name);
  },

  update: (id, name) => {
    return projectModel.edit(id, name);
  },
};

export default projectService;
