/*
*  [ Custom plugins ]
* 
* .init([options])
*  
*   --> Consumer.listener 
*       - await plugin.onMessage({ message , consumer }, payload);
* 
*   - payload.valid default true : {Boolean}
*     -- if false it will STOP from emitting to micro
*   - payload.data default null : {Any}
*     -- if set that is what it will stream to micro
*     -- if not set it will by default JSON.parse from string
*   - payload.topic : {String}
* .onMessage(<pulsar>, <payload>)
*/

const Plugins = new Map();
module.exports = Plugins;