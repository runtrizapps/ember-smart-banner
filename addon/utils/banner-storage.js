import localStorage from '../utils/local-storage';

const {
  setItem,
  getItem,
} = localStorage;

function _setTimeStamp(key, additionalNamespace) {
  const now = new Date();
  return setItem(key, now, additionalNamespace);
}

export function getDayClosed(additionalNamespace) {
  return getItem('lastDayClosed', additionalNamespace);
}

export function setDayClosed(additionalNamespace) {
  return _setTimeStamp('lastDayClosed', additionalNamespace);
}

export function getDayVisited(additionalNamespace) {
  return getItem('lastDayVisited', additionalNamespace);
}

export function setDayVisited(additionalNamespace) {
  return _setTimeStamp('lastDayVisited', additionalNamespace);
}
