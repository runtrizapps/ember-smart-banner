import localForage from '../utils/localforage';

const {
  setItem,
  getItem,
} = localForage;

function _setTimeStamp(key) {
  const now = new Date();
  return setItem(key, now);
}

export function getDayClosed() {
  return getItem('lastDayClosed');
}

export function setDayClosed() {
  return _setTimeStamp('lastDayClosed');
}

export function getDayVisited() {
  return getItem('lastDayVisited');
}

export function setDayVisited() {
  return _setTimeStamp('lastDayVisited');
}
