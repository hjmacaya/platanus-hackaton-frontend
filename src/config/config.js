import dotenv from 'dotenv';

dotenv.config();

const configFile = {
  API_BASE_URL: process.env.API_BASE_URL
}

export {
  configFile
}