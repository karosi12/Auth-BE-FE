import {Sequelize} from 'sequelize-typescript';

const { database, dialect, username, host, password} =  process.env;

export const sequelize = new Sequelize({
  database,
  dialect: 'postgres', // dialect can not be type of undefined
  username,
  password,
  host,
  models: [__dirname + '/models'],
});
