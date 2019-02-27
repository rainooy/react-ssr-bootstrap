import date from './dateFormat';

export default {
  normalizeNeu(neuAmount) {
    return neuAmount / Math.pow(10, 8);
  },
  digits(num) {
    return num ? String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") : num
  },
  normalizeSize(size) {
    return size ? (size / 1024).toFixed(2) : size;
  },
  date,
};