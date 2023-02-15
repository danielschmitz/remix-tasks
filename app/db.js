import knexfile from '../knexfile'
import knex from 'knex'
import dotenv from 'dotenv'

dotenv.config()

const isProduction = process.env.NODE_ENV === 'production'

const db = knex(
    isProduction ?
        knexfile.production : knexfile.development
)

export default db