require('dotenv').load();

let envUrl = '';
const prodEnvUrl = `mongodb://timjenkins:${process.env.PROD_MONGO_PWD}@stuffdb-shard-00-00-qg7z1.mongodb.net:27017,stuffdb-shard-00-01-qg7z1.mongodb.net:27017,stuffdb-shard-00-02-qg7z1.mongodb.net:27017/test?ssl=true&replicaSet=StuffDB-shard-0&authSource=admin&retryWrites=true`;

switch (process.env.NODE_ENV) {
  case 'dev':
    envUrl = prodEnvUrl;
    break;
  case 'prod':
    envUrl = prodEnvUrl;
    break;
  case 'test':
    envUrl = 'mongodb://127.0.0.1:27017';
    break;
  default:
    envUrl = prodEnvUrl;
}


module.exports = {
  dbUrl: envUrl,
  globalSalt: process.env.GLOBAL_SALT,
  jwtSecret: process.env.JWT_SECRET,
  publicPaths: [
    '/api/login',
    '/api/signup',
  ],
};
