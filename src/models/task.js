import db from '../db/db.js';

const task = {
  create: ({start, end, title, projectId}) => {
    return db('task').insert({
      title,
      end,
      start,
      project_id: projectId,
    });
  },
};

export default task;
