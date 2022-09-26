import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'postgres',
  database: 'lejhwkyp',
  username: 'lejhwkyp',
  password: 'AW0jy2Bpp71OiLe7GLeZxmnifDZzWUjf',
  host: 'jelani.db.elephantsql.com',
});

sequelize.sync({ alter: true });

export default sequelize;
