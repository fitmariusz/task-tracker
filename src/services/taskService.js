import taskModel from '../models/task.js';
import projectModel from '../models/project.js';

const taskService = {
  create: async(start, end, title, projectId) => {
    // TODO: add validation 

    // valdate project
    // TODO: consider importance of this  
    const project = await projectModel.selectProject(projectId);
    if (!project) throw 'err_project';

    return taskModel.create({start, end, title, projectId});
  },
};

export default taskService;
