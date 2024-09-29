require('dotenv').config();

module.exports = {
  development: {
    username: process.env.CONFIG_USERNAME,
    password: process.env.CONFIG_PASSWORD,
    database: process.env.CONFIG_DATABASE,
    host: process.env.CONFIG_HOST,
    port: process.env.CONFIG_PORT,
    dialect: process.env.CONFIG_DIALECT,
    dialectOptions: {
      useUTC: false
    },
    timezone: '+07:00',
    connectionRetryInterval: 5000
  },
  test: {
    username: process.env.CONFIG_USERNAME,
    password: process.env.CONFIG_PASSWORD,
    database: process.env.CONFIG_DATABASE,
    host: process.env.CONFIG_HOST,
    port: process.env.CONFIG_PORT,
    dialect: process.env.CONFIG_DIALECT,
    dialectOptions: {
      useUTC: false
    },
    timezone: '+07:00',
    connectionRetryInterval: 5000
  },
  production: {
    username: process.env.CONFIG_USERNAME_PRODUCTION,
    password: process.env.CONFIG_PASSWORD_PRODUCTION,
    database: process.env.CONFIG_DATABASE_PRODUCTION,
    host: process.env.CONFIG_HOST_PRODUCTION,
    port: process.env.CONFIG_PORT_PRODUCTION,
    dialect: process.env.CONFIG_DIALECT_PRODUCTION,
    dialectOptions: {
      useUTC: false
    },
    timezone: '+07:00',
    connectionRetryInterval: 5000
  }
};
