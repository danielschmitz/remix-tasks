import dotenv from 'dotenv';
const knexfile = require('../knexfile')

dotenv.config();
const isProduction = process.env.NODE_ENV === 'production'

declare global {
  var __db: any | undefined;
}

let db: any;

if (!global.__db) {
  db = require('knex')(
    isProduction ?
        knexfile.production : knexfile.development
  )
  global.__db = db
} else {
  db = global.__db
}

export default db