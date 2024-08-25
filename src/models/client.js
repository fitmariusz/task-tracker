import db from '../db/db.js';
const PROJECT_TABLE = 'client';

const client = {
  create: data => {
    return db(PROJECT_TABLE).insert({name: data});
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

  isClient: async () => {
    return db(PROJECT_TABLE)
      .select()
      .then(d => d.length > 0);
  },
};

export default client;
