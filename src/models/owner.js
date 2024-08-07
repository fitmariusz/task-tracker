import db from '../db/db.js';

const owner = {
  create: async (data) => {
    const [id] = await db('client').insert({name: data});
    return id;
  }, 
};

export default owner;
