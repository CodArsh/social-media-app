const actions = {
  SET_LANGUAGE: 'auth/SET_LANGUAGE',
  SELECT_LANGUAGE: 'auth/SELECT_LANGUAGE',
  UPDATE_LANGUAGE: 'auth/UPDATE_LANGUAGE',
  RELOAD: 'auth/RELOAD',
  LANG_BOOL: 'auth/LANG_BOOL',

  setLanguage: languageData => dispatch =>
    dispatch({
      type: actions.SET_LANGUAGE,
      languageData,
    }),
  setSelectLanguage: selectLanguage => dispatch =>
    dispatch({
      type: actions.SELECT_LANGUAGE,
      selectLanguage,
    }),
  languageUpdate: updateLanguage => dispatch =>
    dispatch({
      type: actions.UPDATE_LANGUAGE,
      updateLanguage,
    }),
  setReloadBool: reloadBool => dispatch =>
    dispatch({
      type: actions.RELOAD,
      reloadBool,
    }),
  setLangBool: LangBool => dispatch =>
    dispatch({
      type: actions.LANG_BOOL,
      LangBool,
    }),
};

export default actions;
