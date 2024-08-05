import 'dotenv/config';

import knex from 'knex';
import config from './knexfile.js';

const env = process.env.ENV;

const knexInit = knex(config[env]);
