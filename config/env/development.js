module.exports = {

  port: process.env.APP_PORT,

  connections: {
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
    migrate: 'drop',
  },

  log: {
    level: 'debug'
  },

  custom: {
    // baseUrl: 'https://example.com',
    // internalEmailAddress: 'support@example.com',
  },

  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },

};
