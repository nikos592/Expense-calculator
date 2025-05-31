import { Sequelize, Options } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Parse database URL and ensure it's properly formatted
const getDatabaseConfig = (): Options => {
  const dbUrl = process.env.DATABASE_URL;
  
  if (!dbUrl) {
    console.warn('DATABASE_URL not found, using default configuration');
    return {
      database: 'calculator',
      username: 'postgres',
      password: 'postgres',
      host: 'localhost',
      port: 5432,
      dialect: 'postgres'
    };
  }

  try {
    const url = new URL(dbUrl);
    return {
      database: url.pathname.substring(1), // Remove leading slash
      username: url.username,
      password: url.password,
      host: url.hostname,
      port: parseInt(url.port || '5432'),
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
      logging: false
    };
  } catch (error) {
    console.error('Error parsing DATABASE_URL:', error);
    throw new Error('Invalid DATABASE_URL format');
  }
};

const sequelize = new Sequelize(getDatabaseConfig());

export default sequelize; 