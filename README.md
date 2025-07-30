# At an internal package to us ein micros add into .package.json 

## Install

```bash
npm install @scriptengineio/squid-pulsar@github:scriptengineio/squid-pulsar#master
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

### Produce
Will register the producer under the topic and store so it will become available for `SquidPulsar.send(\<topc\>, { message })`

```javascript
const SquidPulsar = require('@scriptengineio/squid-pulsar');
await SquidPulsar.init({ clientSettings });

let producer = await SquidPulsar.addProducer({ settings });

producer.send({ message });
```

### Plugins \<Redis idempotence \>

Options 
 - engine : Redis engine

```javascript
const SquidPulsar = require('@scriptengineio/squid-pulsar');
const Redis = require('ioredis');
await SquidPulsar.init({ clientSettings });

SquidPulsar.use('redis', { engine : new Redis() });

let consumer = await SquidPulsar.addConsumer({ settings });

consumer.on('message', event => { });
consumer.on('error', error => { });
```

### Send
Will look for the producer under that topic and use its .send mechanism.

```javascript
const SquidPulsar = require('@scriptengineio/squid-pulsar');

SquidPulsar.send('topic', { message });
```