const Plugin = { 
  engine : null, 
  ttl    : 600
};

Plugin.init = function(settings){
  if(!settings.engine){ throw new Error('Missing Redis engine'); }
  Plugin.engine = settings.engine;
  if(typeof settings.ttl == 'number'){ Plugin.ttl = settings.ttl; }
};

Plugin.onMessage = async function(pulsar, payload){
  if(!Plugin.engine){ throw new Error('Missing Redis engine'); }
  if(Plugin.engine.status !== 'ready'){ throw new Error('Redis engine not ready'); }

  let id    = pulsar.message.getMessageId().toString();
  let topic = pulsar.message.getTopicName?.() || payload.topic;
  let value = pulsar.message.getData().toString();
  let key   = `pulsar-idempotence:${topic}/${id}`;

  const isFirst = await Plugin.engine.set(key, value, 'NX', 'EX', Plugin.ttl);
  if (!isFirst) { 
    console.log({ message : `Duplicate event detected for key ${key}, skipping` }); 
    await pulsar.consumer.acknowledge(pulsar.message);

    payload.valid = false; 
    return false; 
  }

  payload.valid = true; // Stream
  payload.data  = JSON.parse(value); // decode
};

module.exports = Plugin;