const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'panteras_angie_web',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

