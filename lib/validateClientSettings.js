const Pulsar = require('pulsar-client');
const Utils = require('./utils');

module.exports = function validateClientSettings(settings) {
  if (!(settings instanceof Object)) { throw new Error('Settings must be an {Object}'); }
  if (!settings.serviceUrl) { throw new Error('Missing serviceUrl'); }

  // Numbers
  if (settings.ioThreads) { settings.ioThreads = Number.parseInt(settings.ioThreads); }
  if (settings.messageListenerThreads) { settings.messageListenerThreads = Number.parseInt(settings.messageListenerThreads); }
  if (settings.statsIntervalInSeconds) { settings.statsIntervalInSeconds = Number.parseInt(settings.statsIntervalInSeconds); }
  if (settings.concurrentLookupRequest) { settings.concurrentLookupRequest = Number.parseInt(settings.concurrentLookupRequest); }
  if (settings.operationTimeoutSeconds) { settings.operationTimeoutSeconds = Number.parseInt(settings.operationTimeoutSeconds); }

  // Booleans
  if (settings.tlsValidateHostname) { settings.tlsValidateHostname = Utils.toBoolean(settings.tlsValidateHostname); }
  if (settings.tlsAllowInsecureConnection) { settings.tlsAllowInsecureConnection = Utils.toBoolean(settings.tlsAllowInsecureConnection); }

  if (settings.authentication) {
    // Token Strategy
    if (settings.authentication.token) {
      settings.authentication = new Pulsar.AuthenticationToken(settings.authentication);
    }
  }

  return settings;
};