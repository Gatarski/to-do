import { Sequelize } from 'sequelize';

const db = new Sequelize(process.env.DATABASE_MYSQL_URL as string, {
  dialect: 'mysql',
})

const database = {
  db,
  isInitialized: false
}

export default database
