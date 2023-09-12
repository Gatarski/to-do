import { Sequelize } from 'sequelize';

// if flag DEV_ENV is 'on' it connect to localhost database 
const getDb = () => {
  if (process.env.DEV_ENV === 'on') {
    return new Sequelize(
      process.env.DB_NAME_LOCALHOST as string,
      process.env.DB_USER_LOCALHOST as string,
      process.env.DB_PASSWORD_LOCALHOST as string,
      {
        dialect: 'mysql',
        host: '172.19.0.10', // this IP address must be equal with IP from docker-compose
        port: 3306,
      },
    );
  }
  return new Sequelize(process.env.PRODUCTION_DATABASE_MYSQL_URL as string, {
    dialect: 'mysql',
  });
};
const db = getDb();

const database = {
  db,
  isInitialized: false,
};

export default database;
