import oM from '../models/owner.js';

const ownerService = {
  create: async data => {
    return await oM.create(data);
  },
};

export default ownerService;
