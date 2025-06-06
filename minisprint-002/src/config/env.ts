import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '3000', 10),
  
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    name: process.env.DB_NAME || 'hotel_management_db',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    dialect: 'postgres' as const,
    logging: process.env.NODE_ENV === 'development'
  },
  
  jwt: {
    secret: process.env.JWT_SECRET || 'hotel-management-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  }
};

export default config;
