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

```javascript
const SquidPulsar = require('@scriptengineio/squid-pulsar');

SquidPulsar.send('topic', { message });
```