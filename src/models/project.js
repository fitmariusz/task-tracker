import db from '../db/db.js';
const PROJECT_TABLE = 'project';

const project = {
  create: (name, client_id) => {
    return db(PROJECT_TABLE).insert({name, client_id});
  },

  selectProject: id => {
    return db(PROJECT_TABLE).select('name').where('id', id);
  },

  listAll: () => {
    return db(PROJECT_TABLE).select();
  },

  delete: name => {
    return db(PROJECT_TABLE).where('name', name).del(['id', 'name']);
  },

  edit: (id, name) => {
    return db(PROJECT_TABLE).where({id}).update({name}, ['name']);
  },
};

export default project;
