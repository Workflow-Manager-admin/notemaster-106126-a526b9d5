const { Sequelize } = require('sequelize');
require('dotenv').config();

const DB_STORAGE = process.env.DB_STORAGE || './notes.sqlite';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: DB_STORAGE,
  logging: false,
});

module.exports = sequelize;
