const EventEmitter = require('events');
const Plugins = require('../plugins');

module.exports = class Consumer extends EventEmitter {
  constructor (options = {}) {
    super();
    this.topic        = options.topic;
    this.subscription = options.subscription;
  }

  async decode (message, consumer) {
    try {
      await consumer.acknowledge(message); // fire and forget

      let payload = { 
        valid        : true, 
        data         : null, 
        topic        : this.topic,
        subscription : this.subscription
      };

      for (const plugin of Plugins.values()) {
        await plugin.onMessage({ message , consumer }, payload);
        if(!payload.valid){ break; }
      }

      // STOP: got processed before
      if(!payload.valid){ 
        await consumer.acknowledge(message);
        return false; 
      } 

      if(!payload.data){ payload.data = JSON.parse(message.getData().toString()); } // Default

      this.emit('message', payload.data); // process
    } catch (error) {
      console.error(error);
      this.emit('error', error);
      await consumer.negativeAcknowledge(message);
    }
  }
};
