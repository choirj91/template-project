const dotenv = require('dotenv');
dotenv.config();
const Sequelize =require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  "development": {
    "username": process.env.DEV_DB_SID,
    "password": process.env.DEV_DB_PASSWORD,
    "database": process.env.DEV_DB_SID,
    "host": process.env.DEV_DB_HOST,
    "dialect": "mysql",
    "timezone": '+09:00',
    // "logging": false //로그
  },
  "test": {
    "username": process.env.DEV_DB_ID,
    "password": process.env.DEV_DB_PASSWORD,
    "database": process.env.DEV_DB_SID,
    "host": process.env.DEV_DB_HOST,
    "dialect": "mysql",
    "timezone": '+09:00'
  },
  "production": {
    "username": process.env.DB_ID,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_SID,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "timezone": '+09:00',
    // "logging": false //로그
  }
}
