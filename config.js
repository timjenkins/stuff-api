require('dotenv').load();

let envUrl = '';

switch (process.env.NODE_ENV) {
  case 'dev':
    envUrl = process.env.PROD_MONGO_URL;
    break;
  case 'prod':
    envUrl = process.env.PROD_MONGO_URL;
    break;
  case 'test':
    envUrl = 'mongodb://127.0.0.1:27017';
    break;
  default:
    envUrl = process.env.PROD_MONGO_URL;
}


module.exports = {
  dbUrl: envUrl,
  globalSalt: process.env.GLOBAL_SALT,
  jwtSecret: process.env.JWT_SECRET,
  publicPaths: [
    '/login',
    '/signup',
  ],
};

