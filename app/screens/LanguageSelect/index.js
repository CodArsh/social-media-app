import { View, Text, ScrollView, Image } from 'react-native';
import React from 'react';
import style from './style';
import { Images } from '@config';
import LangSelect from '@components/LangSelect';

const LanguageSelect = ({ navigation, route }) => {
  return (
    <ScrollView style={style.container} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={style.container1}>
        <Image
          source={Images.logo}
          style={style.profileimage}
          resizeMode="cover"
        />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text style={style.centerTxt}>Please select your language</Text>
      </View>
      <LangSelect />
    </ScrollView>
  );
};

export default LanguageSelect;
