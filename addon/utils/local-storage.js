const namespace = 'ember-smart-banner';

export function setItem(key, value) {
  localStorage.setItem(_namespacedKey(key), JSON.stringify(value));
}

export function getItem(key) {
  const result = localStorage.getItem(_namespacedKey(key));
  if (result) {
    return JSON.parse(result);
  }
}

function _namespacedKey(keyName) {
  return `${namespace}.${keyName}`;
}
