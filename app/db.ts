import dotenv from 'dotenv';

dotenv.config();

const knexfile = require('../knexfile')

declare global {
  var __db: any | undefined;
}

const isProduction = process.env.NODE_ENV === 'production'

let db: any;

if (!global.__db) {
  console.log('set global db')
  db = require('knex')(
    isProduction ?
        knexfile.production : knexfile.development
  )
  global.__db = db
} else {
  console.log('use global db')
  db = global.__db
}


export default db