require('ts-node/register');
const configs = require('./database.config');
module.exports = configs.databaseConfig.development;
