# At an internal package to us ein micros add into .package.json 

```javascript
    "@scriptengineio/squid-pulsar": "github:scriptengineio/squid-pulsar#master"
```

## Usage


### Connect

```javascript
const SquidPulsar = require('@scriptengineio/squid-pulsar');
await SquidPulsar.init({ clientSettings });
```

### Consume

```javascript
const SquidPulsar = require('@scriptengineio/squid-pulsar');
await SquidPulsar.init({ clientSettings });

let consumer = await SquidPulsar.addConsumer({ settings });

consumer.on('message', event => { });
consumer.on('error', error => { });
```

### Plugins \<Redis idempotence \>

Options 
 - engine : Redis engine
 - logger : Object 
 - - enabled : true/false
 - - info : handler to print info messages
 - - error : handler to print error messages
```javascript
const SquidPulsar = require('@scriptengineio/squid-pulsar');
await SquidPulsar.init({ clientSettings });

SquidPulsar.use('redis', {
  engine : new Redis(),
  logger : { enabled : true, info : Logger.info }
});

let consumer = await SquidPulsar.addConsumer({ settings });

consumer.on('message', event => { });
consumer.on('error', error => { });
```