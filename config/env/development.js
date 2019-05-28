module.exports = {

  port: process.env.APP_PORT,

  datastores: {
    default: {
      adapter: 'sails-postgresql',
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    },
  },

  models: {
    migrate: 'alter',
  },

  log: {
    level: 'debug'
  },

  custom: {
    // baseUrl: 'https://example.com',
    // internalEmailAddress: 'support@example.com',
  },

};
