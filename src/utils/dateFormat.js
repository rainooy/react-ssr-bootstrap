import { distanceInWordsToNow, format, distanceInWordsStrict  } from 'date-fns';

const locales = {
  zh: require('date-fns/locale/zh_cn'),
  en: require('date-fns/locale/en'),
}

export default {
  distanceInWordsToNow(date, opts) {
    return distanceInWordsToNow(date, Object.assign({}, opts, {
      locale: locales[window.env.lang || 'en']
    }));
  },
  distanceInWordsToNowStrict(date, opts) {
    let words = distanceInWordsStrict(new Date(), date, Object.assign({}, opts, {
      locale: locales[window.env.lang || 'en'],
      addSuffix: false
    }));
    // words = words.replace(/(minutes|hours|hour|months|years|days|seconds)/, (match) => match[0]);
    return words;
  },
  format(date, formatStr, opts) {
    return format(date, formatStr, Object.assign({}, opts, {
      locale: locales[window.env.lang || 'en']
    }));
  },
}