const namespace = 'ember-smart-banner';

export function setItem(key, value, additionalNamespace) {
  localStorage.setItem(_namespacedKey(key, additionalNamespace), JSON.stringify(value));
}

export function getItem(key, additionalNamespace) {
  try {
    const result = localStorage.getItem(_namespacedKey(key, additionalNamespace));
    if (result) {
      return safelyParseJSON(result);
    }
  } catch (e) {
    // Eat
  }
}

function _namespacedKey(keyName, additionalNamespace = '') {
  let key = `${namespace}.${keyName}`;
  if (additionalNamespace) {
    key = `${additionalNamespace}.${key}`;
  }

  return key;
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
