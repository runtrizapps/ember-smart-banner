import Ember from 'ember';
const namespace = 'ember-smart-banner';

const {
  RSVP: { Promise }
} = Ember;

export function setItem(key, value) {
  return new Promise((resolve, reject) => {
    if (localforage.driver()) {
      const result = localforage.setItem(_namespacedKey(key), JSON.stringify(value));
      resolve(result);
    } else {
      reject({ error: 'localforage driver does not exist' });
    }
  });

}

export function getItem(key) {
  return new Promise((resolve, reject) => {
    if (localforage.driver()) {
      const result = localforage.getItem(_namespacedKey(key));
      const item = safelyParseJSON(result);
      resolve(item);
    } else {
      reject({ error: 'localforage driver does not exist' });
    }
  });
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
