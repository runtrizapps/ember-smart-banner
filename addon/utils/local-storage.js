const namespace = 'ember-smart-banner';

export function setItem(key, value) {
  localStorage.setItem(_namespacedKey(key), JSON.stringify(value));
}

export function getItem(key) {
  const result = localStorage.getItem(_namespacedKey(key));
  if (result) {
    return safelyParseJSON(result);
  }
}

function _namespacedKey(keyName) {
  return `${namespace}.${keyName}`;
}

function safelyParseJSON (json) {
  let parsed;

  try {
    parsed = JSON.parse(json);
  } catch (e) {
    // catch error;
  }

  return parsed; // could be undefined
}
