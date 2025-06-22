const Core = require('../core');
const Producer = require('../lib/producer');
const validateProducerOptions = require('../lib/validateProducerOptions')

module.exports = async function (options) {
  if (!Core.client) { throw new Error('No client, please .init(settings)'); }
  if(!options.topic){ throw new Error('Missing topic'); }
  if(typeof options.topic != 'string'){ throw new Error('Malformed topic'); }

  let existing = Core.producers.get(options.topic);
  if(existing){ 
    console.log({
      level : 'warn',
      message : 'Existing producer for topic', options
    });
    return existing; 
  }

  let valid    = validateProducerOptions(options);
  let client   = await Core.client.createProducer(valid);
  let producer = new Producer(client, valid);

  Core.producers.set(options.topic, producer);
  return producer;
};