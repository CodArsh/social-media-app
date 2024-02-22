import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import BaseSetting from '@config/setting';
import { BaseColors } from '@config/theme';
import RNRestart from 'react-native-restart';
import languageActions from '../../redux/reducers/language/actions';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';
import translate from '../../lang/lang/Translate';
import Button from '@components/Button';
import { getApiData } from '@utils/apiHelper';
import Loader from '@components/Loader/Loader';
import _ from 'lodash';
import { Images } from '@config';

const LangSelect = () => {
  const { languageData } = useSelector(state => state.language);
  const dispatch = useDispatch();
  const { setLanguage, setReloadBool, setLangBool } = languageActions;
  const [LangList, setLangList] = useState([]);
  const [selected, setSelected] = useState({});
  const [LangLoader, setLangLoader] = useState(false);
  const [BtnLoader, setBtnLoader] = useState(false);
  const icon = {
    size: 20,
    color: BaseColors.primary,
  };

  useEffect(() => {
    LangListAPI();
  }, []);

  const LangListAPI = async () => {
    setLangLoader(true);
    const endPoint = BaseSetting.endpoints.LangList;
    try {
      const res = await getApiData(endPoint, 'GET');
      if (res?.status) {
        setLangList(res?.data);
        const sel = res?.data.find(item => item?.id === languageData);
        setSelected(sel);
      } else {
        setLangList();
        setSelected({});
      }
      setLangLoader(false);
    } catch (error) {
      setLangLoader(false);
      console.log('📌 ⏩ file: index.js:24 ⏩ LangListAPI ⏩ error:', error);
    }
  };

  return (
    <>
      {LangLoader ? (
        <View style={styles.LoaderCon}>
          <Loader style={styles.Loader} />
        </View>
      ) : (
        <View>
          <View style={styles.optcontainer}>
            {_.isArray(LangList) && !_.isEmpty(LangList)
              ? LangList?.map(item => {
                  return (
                    <TouchableOpacity
                      style={styles.row}
                      activeOpacity={BaseSetting.buttonOpacity}
                      onPress={() => setSelected(item)}
                      key={item?.id}
                    >
                      <Image
                        source={
                          item?.id === 'en-US'
                            ? Images.US
                            : item?.id === 'de-DE'
                            ? Images.GR
                            : item?.id === 'fr-FR'
                            ? Images.FR
                            : item?.id === 'nl-NL'
                            ? Images.DU
                            : null
                        }
                        resizeMode="cover"
                        style={styles.img}
                      />
                      <Text style={styles.lable} numberOfLines={2}>
                        {item?.name}
                      </Text>
                      <View>
                        {selected?.id === item?.id ? (
                          <Icon
                            name="checkcircle"
                            size={icon.size}
                            color={icon.color}
                          />
                        ) : (
                          <Icon2
                            name="circle"
                            size={icon.size}
                            color={icon.color}
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                })
              : null}
          </View>
          <View style={{ paddingTop: 30, paddingBottom: 20 }}>
            <Button
              title={translate('changeLang')}
              loading={BtnLoader}
              onPress={() => {
                setBtnLoader(true);
                dispatch(setLanguage(selected?.id));
                dispatch(setReloadBool(true));
                dispatch(setLangBool(true));
                setTimeout(() => {
                  RNRestart.Restart();
                }, 10);
              }}
            />
          </View>
        </View>
      )}
    </>
  );
};

export default LangSelect;
