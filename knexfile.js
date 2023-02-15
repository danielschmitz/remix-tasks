// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const knexfile = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './dev.sqlite3'
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./app/migrations",
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    pool: {
      min: 1,
      max: 100
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./app/migrations",
    }
  }
};

module.exports = knexfile;
