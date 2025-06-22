module.exports = class Producer {

  constructor (client, options = {}) {
    this.client  = client;
    this.options = options;
  }

  send (message){
    return new Promise( (resolve, reject) => {
      if(!message instanceof Object){ return reject('Malformed message'); }
      if(!message.data instanceof Object){ return reject('Malformed message data'); }

      try {
        message.data = Buffer.from(JSON.stringify(message.data));
        this.client.send(message).then(resolve, reject);
      } catch(error){ return reject(error); }
    });
  }
};
