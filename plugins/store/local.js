const { LRUCache } = require('lru-cache');

const Plugin = { 
  cache    : null,
  settings : {
   allowStale     : false,
   ttl            : 1000 * 60 * 5,
   updateAgeOnGet : false,
   updateAgeOnHas : false,
  }
};

Plugin.init = function(settings){
  if(typeof settings === 'object'){ Object.assign(Plugin.settings, settings) }
  Plugin.cache = new LRUCache(Plugin.settings);
};

Plugin.onMessage = async function(pulsar, payload){
  if(!Plugin.cache){ throw new Error('Missing cache store'); }

  let id    = pulsar.message.getMessageId().toString();
  let topic = pulsar.message.getTopicName?.() || payload.topic;
  let value = pulsar.message.getData().toString();
  let sub   = payload.subscription || 'default';
  let nsp   = `pulsar-idempotence:${topic}/${sub}/${id}`;
  let key   = Buffer.from(nsp).toString('base64url')

  if(sub == 'default'){
    console.log({ message : 'WARNING default sub', key , value, nsp, level : 'warn', plugin : 'local' });
  }

  let stored = Plugin.cache.get(key);

  if (stored) { 
    console.log({ key, value, nsp, 
      plugin  : 'local',
      message : `Duplicate event detected. skipping`, 
      level   : 'debug', 
      details : {
        publishTime     : new Date(pulsar.message.getPublishTimestamp()).toISOString(),
        redeliveryCount : pulsar.message.getRedeliveryCount?.() || 0,
        properties      : pulsar.message.getProperties?.()
      }
    }); 

    payload.valid = false; 
    return false; 
  }

  Plugin.cache.set(key, nsp);

  payload.valid = true; // Stream
  payload.data  = JSON.parse(value); // decode
};

module.exports = Plugin;