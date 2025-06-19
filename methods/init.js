const Pulsar = require('pulsar-client');
const Core = require('../core');
const validateClientSettings = require('../lib/validateClientSettings');

module.exports = async function(settings){
  if (!settings) { throw new Error('Missing settings'); }

  Core.client = new Pulsar.Client(validateClientSettings(settings));
  return Core.client;
};