module.exports = function validateConsumerOptions(options) {
  if (typeof options.topic !== 'string') { throw new Error('Topic name must be a string'); }
  if (options.subscription && typeof options.subscription !== 'string') { throw new Error('Subscription must be a string'); }

  // Available options are Exclusive, Shared, and Failover.
  if (options.subscriptionType) {
    if (['Exclusive', 'Shared', 'Failover'].indexOf(options.subscriptionType) === -1) {
      throw new Error(`Invalid subscription type : ${options.subscriptionType}`);
    }
  }

  // Numbers
  if (options.ackTimeoutMs) { options.ackTimeoutMs = Number.parseInt(options.ackTimeoutMs); }
  if (options.receiverQueueSize) { options.receiverQueueSize = Number.parseInt(options.receiverQueueSize); }
  if (options.receiverQueueSizeAcrossPartitions) { options.receiverQueueSizeAcrossPartitions = Number.parseInt(options.receiverQueueSizeAcrossPartitions); }

  // TODO
  // - consumerName
  // - properties

  /* Custom */

  // - Dinamic subscription
  if (!options.subscription) {
    if (!process.env.POD_NAMESPACE || !process.env.POD_NAME) { throw new Error('Not able to build subscription : missing POD_NAMESPACE and/or POD_NAME env var'); }
    options.subscription = `${process.env.POD_NAMESPACE}-${process.env.POD_NAME}`;
  }

  // - Subscription suffix
  if (options.subsciptionSuffix) {
    if (typeof options.subsciptionSuffix !== 'string') { throw new Error('Subscription suffix must be a string'); }

    options.subscription += `-${options.subsciptionSuffix}`;
    delete options.subsciptionSuffix;
  }

  if (!options.consumerName) {
    options.consumerName = options.subscription;
  }

  return options;
};