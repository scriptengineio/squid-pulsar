const Plugin = { 
  engine : null, 
  ttl    : 600
};

Plugin.init = function(settings){
  if(!settings.engine){ throw new Error('Missing Redis engine'); }
  Plugin.engine = settings.engine;

  // ttl
  if(typeof settings.ttl == 'number'){ 
    if (settings.ttl <= 0) { throw new Error('Invalid Redis TTL — must be greater than 0 seconds'); }
    Plugin.ttl = settings.ttl; 
  }
};

Plugin.onMessage = async function(pulsar, payload){
  if(!Plugin.engine){ throw new Error('Missing Redis engine'); }
  if(Plugin.engine.status !== 'ready'){ throw new Error('Redis engine not ready'); }

  let id    = pulsar.message.getMessageId().toString();
  let topic = pulsar.message.getTopicName?.() || payload.topic;
  let value = pulsar.message.getData().toString();
  let sub   = payload.subscription || 'default';
  let nsp   = `pulsar-idempotence:${topic}/${sub}/${id}`;
  let key   = Buffer.from(nsp).toString('base64url')

  if(sub == 'default'){
    console.log({ message : 'WARNING default sub', key , value, nsp, level : 'warn' });
  }

  const isFirst = await Plugin.engine.set(key, value, 'NX', 'EX', Plugin.ttl);
  if (!isFirst) { 

    console.log({ key, value, nsp, 
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

  payload.valid = true; // Stream
  payload.data  = JSON.parse(value); // decode
};

module.exports = Plugin;