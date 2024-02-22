import { ScrollView, View } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import HeaderBar from '@components/HeaderBar';
import translate from '../../lang/lang/Translate';
import BaseSetting from '@config/setting';
import { getApiData } from '@utils/apiHelper';
import { useEffect } from 'react';
import NoDataFound from '@components/NoData';
import Loader from '@components/Loader/Loader';
import { useSelector } from 'react-redux';

const PrivacyPolicy = () => {
  const { languageData } = useSelector(state => state.language);
  const [data, setData] = useState('');
  const [loader, setLoader] = useState(false);

  const source = {
    html: data,
  };

  async function getPP() {
    setLoader(true);
    let endPoints = `${BaseSetting.endpoints.cmsdetails}?slug=privacy_policy&language_id=${languageData}`;
    try {
      const response = await getApiData(endPoints, 'GET');
      if (response?.status) {
        setData(response?.data?.app_body);
      } else {
        setData('');
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log('📌 ⏩ file: index.js:29 ⏩ getPP ⏩ error:', error);
    }
  }
  useEffect(() => {
    getPP();
  }, []);

  const { width } = useWindowDimensions();
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <HeaderBar HeaderText={translate('privacyPolicy')} />
      {loader ? (
        <View style={{ flex: 1, justifyContent: 'center', marginBottom: 100 }}>
          <Loader />
        </View>
      ) : (
        <View style={styles.textcontainer}>
          {data ? (
            <RenderHtml contentWidth={width} source={source} />
          ) : (
            <View style={{ height: '100%', justifyContent: 'center' }}>
              <NoDataFound />
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default PrivacyPolicy;
