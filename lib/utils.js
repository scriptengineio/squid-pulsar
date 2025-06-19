const Utils = {};

Utils.toBoolean = function (value) {
  if (typeof value === 'boolean') { return value; }
  if (typeof value === 'string') {
    if (value === 'true') { return true; }
    if (value === 'false') { return false; }
  }
  throw new Error(`Invalid Boolean : ${value}`);
};

module.exports = Utils;
