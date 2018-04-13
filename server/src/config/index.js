const Sequelize = require('sequelize');

module.exports = {
  port: 8000,
  db: {
    database: process.env.DB_NAME || 'GQL',
    user: process.env.DB_USER || 'GQL',
    password: process.env.password || 'GQL',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      operatorsAliases: process.env.aliases || Sequelize.Op,
      host: process.env.HOST || 'localhost',
      storage: './graph.sqlite',
    },
  },
};
