/* eslint-disable react-native/no-inline-styles */
import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import style from './style';
import { Images } from '@config';
import { BaseColors } from '@config/theme';
import Button from '@components/Button';
import translate from '../../lang/lang/Translate';
import { ScrollView } from 'react-native-gesture-handler';

const MainScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={style.container}>
      <View style={style.imgcontainer}>
        <Image
          resizeMode="contain"
          source={Images.mainscreen}
          style={style.profileimage}
        />
      </View>
      <View style={style.textcontainer}>
        <Text style={style.mainheading}>
          {translate('mainscrTitle')}
          {'\n'}
          <Text style={{ color: BaseColors.primary }}>
            {translate('people')}&nbsp;
          </Text>
          {translate('likeyou')}
        </Text>
        <Text style={style.subtitle}>
          {translate('mainscrsubtxt')}
          {'\n'}
          {translate('mainscrsubtxt2')}
        </Text>
      </View>
      <View style={style.buttoncontainer1}>
        <Button
          onPress={() => {
            navigation.navigate('SigninScreen');
          }}
          title={translate('Signin')}
          style={{ marginHorizontal: 50, marginBottom: 10 }}
        />
        <Button
          title={translate('signup')}
          type="outlined"
          style={{ marginHorizontal: 50 }}
          onPress={() => {
            navigation.navigate('SignUp');
          }}
        />
        <View style={style.urlView}>
          <Text>
            {translate('iAgree')}{' '}
            <Text
              style={style.linkText}
              onPress={() => {
                navigation?.navigate('PrivacyPolicy');
              }}
            >
              {translate('privacyPolicy')}
            </Text>{' '}
            {translate('and')}{' '}
            <Text
              style={style.linkText}
              onPress={() => {
                navigation?.navigate('TermsAgreement');
              }}
            >
              {translate('terms&Conditions')}
            </Text>{' '}
            {translate('bySignin')}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default MainScreen;
