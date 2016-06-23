import Ember from 'ember';
const namespace = 'ember-smart-banner';

const {
  RSVP: { Promise }
} = Ember;

export function setItem(key, value) {
  return storageOperation('setItem', _namespacedKey(key), JSON.stringify(value));
}

export function getItem(key) {
  return storageOperation('getItem', _namespacedKey(key))
    .then(safelyParseJSON);
}

function storageOperation(methodName, ...args) {
  const storage = getStorage();
  return Promise.resolve().then(() => {
    if (storage) {
      return storage[methodName](...args);
    } else {
      throw new Error('No local storage capability');
    }
  });
}

function getStorage() {
  if (typeof localforage !== 'undefined') {
    return localforage;
  }

  if (typeof localStorage !== 'undefined') {
    return localStorage;
  }
}

function _namespacedKey(keyName) {
  return `${namespace}.${keyName}`;
}

function safelyParseJSON(json) {
  let parsed;

  try {
    parsed = JSON.parse(json);
  } catch (e) {
    // catch error;
  }

  return parsed; // could be undefined
}
