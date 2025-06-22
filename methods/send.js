const Core = require('../core');

module.exports = function (topicName, message) {
  return new Promise(function (resolve, reject) {
    let producer = Core.producers.get(topicName);
    if (!producer) { return reject(`No producer for ${topicName}`); }
    return producer.send(message).then(resolve, reject);
  });
};