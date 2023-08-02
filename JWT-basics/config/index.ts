import dotenv from 'dotenv';

dotenv.config();

const config = {
  jwt: {
    JWT_SECRET: process.env.JWT_SECRET
  },
  mongodb: {
    MONGO_URI: process.env.MONGO_URI
  },
  port: process.env.PORT,
};

export default config;
