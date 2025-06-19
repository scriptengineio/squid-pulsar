const Core = require('../core');
const Consumer = require('../lib/consumer');
const validateConsumerOptions = require('../lib/validateConsumerOptions')

module.exports = async function (options) {
  if (!Core.client) { throw new Error('No client, please .init(settings)'); }
  let consumer   = new Consumer(options);
  let valid      = validateConsumerOptions(options);

  valid.listener = consumer.decode.bind(consumer);

  await Core.client.subscribe(valid);
  return consumer;
};