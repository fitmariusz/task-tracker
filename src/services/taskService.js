import taskModel from '../models/task.js';
import projectModel from '../models/project.js';

const taskService = {
  create: async (start, end, title, projectId) => {
    // TODO: consider importance of this
    const project = await projectModel.selectProject(projectId);
    if (!project) throw 'Project does not exist';

    return taskModel.create({start, end, title, projectId});
  },

  selectAll: () => {
    return taskModel.listAll();
  },

  selectById: id => {
    return taskModel.selectById(id);
  },

  update: async (id, start, end, title, projectId) => {
    const project = await projectModel.selectProject(projectId);
    if (!project) throw 'Project does not exist';
    return taskModel.edit({id, start, end, title, projectId});
  },
};

export default taskService;
