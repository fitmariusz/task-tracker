import 'dotenv/config';

import knex from 'knex';
import config from './knexfile.js';

const env = process.env.ENV;

export default knex(config[env]);
