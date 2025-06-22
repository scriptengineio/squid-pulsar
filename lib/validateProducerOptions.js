const Utils = require('./utils');

module.exports = function validateProducerOptions(options) {
  if (typeof options.topic !== 'string') { throw new Error('Topic name must be a string'); }

  // Numbers
  if (options.sendTimeoutMs) { options.sendTimeoutMs = Number.parseInt(options.sendTimeoutMs); }
  if (options.maxPendingMessages) { options.maxPendingMessages = Number.parseInt(options.maxPendingMessages); }
  if (options.batchingMaxMessages) { options.batchingMaxMessages = Number.parseInt(options.batchingMaxMessages); }
  if (options.batchingMaxPublishDelayMs) { options.batchingMaxPublishDelayMs = Number.parseInt(options.batchingMaxPublishDelayMs); }
  if (options.maxPendingMessagesAcrossPartitions) { options.maxPendingMessagesAcrossPartitions = Number.parseInt(options.maxPendingMessagesAcrossPartitions); }

  // Booleans
  if (options.blockIfQueueFull) { options.blockIfQueueFull = Utils.toBoolean(options.blockIfQueueFull); }
  if (options.batchingEnabled) { options.batchingEnabled = Utils.toBoolean(options.batchingEnabled); }

  return options;
};