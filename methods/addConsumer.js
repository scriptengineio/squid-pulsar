const Core = require('../core');
const Consumer = require('../lib/consumer');
const validateConsumerOptions = require('../lib/validateConsumerOptions')

module.exports = async function (options) {
  if (!Core.client) { throw new Error('No client, please .init(settings)'); }
  if(!options.topic){ throw new Error('Missing topic'); }
  if(typeof options.topic != 'string'){ throw new Error('Malformed topic'); }

  let existing = Core.consumers.get(options.topic);
  if(existing){ 
    console.log({
      level : 'warn',
      message : 'Existing consumer for topic', options
    });
    return existing; 
  }

  let valid      = validateConsumerOptions(options);
  let consumer   = new Consumer(valid);

  valid.listener = consumer.decode.bind(consumer);

  await Core.client.subscribe(valid);
  return consumer;
};