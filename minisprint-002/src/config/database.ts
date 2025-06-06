import { Sequelize } from 'sequelize';
import config from './env';

const sequelize = new Sequelize(
  config.database.name,
  config.database.username,
  config.database.password,
  {
    host: config.database.host,
    port: config.database.port,
    dialect: config.database.dialect,
    logging: config.database.logging,
    define: {
      timestamps: false,
      freezeTableName: true
    }
  }
);

export const testConnection = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully');
    console.log(`Connected to: ${config.database.name}@${config.database.host}`);
  } catch (error) {
    console.error('Unable to connect to database:', error);
    process.exit(1);
  }
};

export { sequelize };
