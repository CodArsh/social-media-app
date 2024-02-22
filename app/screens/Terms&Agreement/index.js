import { ScrollView, View } from 'react-native';
import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import HeaderBar from '@components/HeaderBar';
import translate from '../../lang/lang/Translate';
import BaseSetting from '@config/setting';
import { getApiData } from '@utils/apiHelper';
import { useEffect } from 'react';
import NoDataFound from '@components/NoData';
import Loader from '@components/Loader/Loader';
import style from './style';
import { useSelector } from 'react-redux';

const TermsAgreement = () => {
  const { languageData } = useSelector(state => state.language);
  const [data, setData] = useState('');
  const [loader, setLoader] = useState(false);

  const source = {
    html: data,
  };

  async function getTerms() {
    setLoader(true);
    let endPoints = `${BaseSetting.endpoints.cmsdetails}?slug=terms_and_conditions&language_id=${languageData}`;
    try {
      const response = await getApiData(endPoints, 'GET');
      if (response?.status) {
        setData(response?.data?.app_body);
      } else {
        setData('');
      }
      setLoader(false);
    } catch (error) {
      console.log('📌 ⏩ file: index.js:34 ⏩ getTerms ⏩ error:', error);
      setLoader(false);
    }
  }
  useEffect(() => {
    getTerms();
  }, []);

  const { width } = useWindowDimensions();
  return (
    <ScrollView style={style.container} showsVerticalScrollIndicator={false}>
      <HeaderBar HeaderText={translate('terms&Conditions')} />
      {loader ? (
        <View style={{ flex: 1, justifyContent: 'center', marginBottom: 100 }}>
          <Loader />
        </View>
      ) : (
        <View style={style.textcontainer}>
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

export default TermsAgreement;
