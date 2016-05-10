import localStorage from '../utils/local-storage';

const {
  setItem,
} = localStorage;

export function setTimeStamp(key) {
  const now = new Date();
  setItem(key, now);
}
