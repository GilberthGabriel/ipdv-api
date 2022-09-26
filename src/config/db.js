import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT || 'postgres',
  database: process.env.DB_NAME || 'lejhwkyp',
  username: process.env.DB_USERNAME || 'lejhwkyp',
  password: process.env.DB_PASSWORD || 'AW0jy2Bpp71OiLe7GLeZxmnifDZzWUjf',
  host: process.env.DB_HOST || 'jelani.db.elephantsql.com',
});

sequelize.sync({ alter: true });

export default sequelize;
