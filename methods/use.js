const Plugins = require('../plugins');

module.exports = function(name, settings){
  if(!name){ throw new Error('Missing plugin name'); }
  if(typeof name !== 'string'){ throw new Error('Plugin name must be a string'); }

  // Existing
  if(Plugins.get(name)){ throw new Error('Plugin all ready initialized'); }

  // From store
  let plugin = require(`../plugins/store/${name}`);
  if(!plugin){ throw new Error('Unregister plugin'); }

  plugin.init(settings);
  Plugins.set(name, plugin);

  return require('../index');
};