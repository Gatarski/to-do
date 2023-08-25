import { Sequelize } from 'sequelize';

// const db = new Sequelize(process.env.DATABASE_MYSQL_URL as string, {
//   dialect: 'mysql',
// })
// HERE to wyżej to do railway bazy danych
const db = new Sequelize('node-complete', 'root', 'Test123!@', {
  dialect: 'mysql',
  host: 'localhost',
});

const database = {
  db,
  isInitialized: false,
};

export default database;
