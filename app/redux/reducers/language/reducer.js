import types from './actions';

const initialState = {
  languageData: 'en-US',
  selectLanguage: false,
  updateLanguage: false,
  reloadBool: false,
  langBool: true,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_LANGUAGE:
      return {
        ...state,
        languageData: action.languageData,
      };
    case types.SELECT_LANGUAGE:
      return {
        ...state,
        selectLanguage: action.selectLanguage,
      };
    case types.UPDATE_LANGUAGE:
      return {
        ...state,
        updateLanguage: action.updateLanguage,
      };
    case types.RELOAD:
      return {
        ...state,
        reloadBool: action.reloadBool,
      };
    case types.LANG_BOOL:
      return {
        ...state,
        langBool: action.LangBool,
      };
    default:
      return state;
  }
}
