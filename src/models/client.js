import db from '../db/db.js';

const client = {
  create: data => {
    return db('client').insert({name: data});
  },

  listAll: () => {
    return db('client').select();
  },

  delete: name => {
    return db('client').where('name', name).del(['id', 'name']);
  },

  edit: (id, name) => {
    return db('client').where({id}).update({name}, ['name']);
  },
};

export default client;
