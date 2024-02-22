import i18n from 'i18n-js';
// import RNRestart from "react-native-restart";
import actions from '../../redux/reducers/language/actions';
import { sendErrorReport } from '../../utils/CommonFunction';

const translationGetters = {
  'en-US': () => require('./en.json'),
  'fr-FR': () => require('./fr.json'),
  'de-DE': () => require('./ge.json'),
  'nl-NL': () => require('./du.json'),
};

export default translate = (key, config) => {
  if (!config) {
    config = {};
  }
  config.defaultValue = key;
  return i18n.t(key, config);
};

const setI18nConfig = (language = "en-US", store, bool, lang) => {
  const isRTL = false;
  let appLanguage = language;
  if (language === null) {
    appLanguage = 'en-US';
    store.dispatch({
      type: actions.SET_LANGUAGE,
      languageData: appLanguage,
    });
  }

  const ReactNative = require('react-native');
  try {
    ReactNative.I18nManager.allowRTL(isRTL);
    ReactNative.I18nManager.forceRTL(isRTL);
  } catch (e) {
    console.log('Error in RTL', e);
    sendErrorReport(e, 'setI18nConfig');
  }

  i18n.translations = { [appLanguage]: translationGetters[appLanguage]() };
  i18n.locale = appLanguage;
  store.dispatch({
    type: actions.UPDATE_LANGUAGE,
    updateLanguage: !lang,
  });
};

export const initTranslate = (store, bool = false) => {
  const {
    language: { languageData, updateLanguage },
  } = store.getState();
  setI18nConfig(languageData, store, bool, updateLanguage);
};
