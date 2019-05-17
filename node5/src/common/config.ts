const config = require('nconf');
config.use('memory');
config.file(`./config.dev.json`);

module.exports = config;